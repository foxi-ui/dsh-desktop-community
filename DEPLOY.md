# dsh-desktop.bugduo.com 服务器部署操作手册

> 适用：**全部操作在云服务器上执行**（通过云控制台 VNC / 网页终端，或你自有的 SSH 方式登录）。
> 服务器为腾讯云（`124.220.212.192`），系统按 Ubuntu/Debian 编写，全程约 15 分钟。
> 站点为纯静态单页，在服务器上构建后用 Nginx 托管，HTTPS 用 Let's Encrypt。
> 本机（Mac）无需任何操作，无需配置 SSH 密钥。

---

## 第 0 步 · 服务器环境准备（一次性）

登录服务器后（root / sudo 权限），安装 Node.js 22 并克隆、构建站点：

```bash
# 1) 安装 Node 22（任选一种方式）
# 方式一：NodeSource
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
# 方式二：nvm
# curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
# source ~/.bashrc && nvm install 22
node -v    # 期望 v22.x

# 2) 创建站点目录并克隆代码
sudo mkdir -p /var/www/dsh-desktop
sudo chown -R $USER:$USER /var/www/dsh-desktop
cd /var/www/dsh-desktop
git clone https://github.com/foxi-ui/dsh-desktop-community.git .

# 3) 安装依赖并构建
npm ci
npm run build

# 4) 把构建产物提升为站点根目录内容
cp -a dist/* . && rm -rf dist
```

完成后站点文件已就绪：`/var/www/dsh-desktop/index.html` 等。

## 第 1 步 · 安装 Nginx 与 certbot

```bash
sudo apt update
sudo apt install -y nginx certbot python3-certbot-nginx
```

> 若为 CentOS：`sudo yum install -y nginx certbot python3-certbot-nginx`

## 第 2 步 · 写 Nginx 配置

```bash
sudo vi /etc/nginx/conf.d/dsh-desktop.bugduo.com.conf
```

粘贴以下完整内容（证书路径第 4 步 certbot 会自动补齐）：

```nginx
# ---------- HTTP → HTTPS ----------
server {
    listen 80;
    listen [::]:80;
    server_name dsh-desktop.bugduo.com;
    return 301 https://$host$request_uri;
}

# ---------- HTTPS ----------
server {
    listen 443 ssl;
    listen [::]:443 ssl;
    http2 on;
    server_name dsh-desktop.bugduo.com;

    # 第 4 步 certbot 会自动生成并替换为真实证书路径
    ssl_certificate     /etc/letsencrypt/live/dsh-desktop.bugduo.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/dsh-desktop.bugduo.com/privkey.pem;

    root  /var/www/dsh-desktop;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /assets/ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    location ~* \.(woff2?)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    gzip on;
    gzip_comp_level 6;
    gzip_min_length 1k;
    gzip_types text/plain text/css application/javascript application/json image/svg+xml font/woff2;

    add_header X-Content-Type-Options nosniff always;
    add_header X-Frame-Options SAMEORIGIN always;
    add_header Referrer-Policy strict-origin-when-cross-origin always;
}
```

校验并生效：

```bash
sudo nginx -t && sudo systemctl reload nginx
```

## 第 3 步 · 验证 HTTP 可访问

```bash
curl -I http://dsh-desktop.bugduo.com
# 期望：HTTP/1.1 301 ... Location: https://dsh-desktop.bugduo.com/
```

> 证书未签发前访问 https 报错属正常，继续第 4 步。

## 第 4 步 · 签发 HTTPS 证书

```bash
sudo certbot --nginx -d dsh-desktop.bugduo.com --agree-tos --redirect -m 你的邮箱@example.com
```

自动续期由系统 timer 负责，验证一次：

```bash
sudo certbot renew --dry-run
```

## 第 5 步 · 上线验证

```bash
# 1) 主页
curl -I https://dsh-desktop.bugduo.com                        # 期望 200
curl -s https://dsh-desktop.bugduo.com | grep -o "<title>[^<]*"   # 期望 DeepSeek Harness Desktop
# 2) 关键资源
curl -I https://dsh-desktop.bugduo.com/fonts/fonts.css        # 期望 200
curl -I https://dsh-desktop.bugduo.com/icon.png               # 期望 200
# 3) 证书
echo | openssl s_client -connect dsh-desktop.bugduo.com:443 -servername dsh-desktop.bugduo.com 2>/dev/null \
  | openssl x509 -noout -issuer -dates
```

浏览器打开 **https://dsh-desktop.bugduo.com**：首屏渲染、字体、图标、滚动动画正常即可。

---

## 日常更新（发布新版本，服务器上执行）

```bash
cd /var/www/dsh-desktop
git pull
npm ci && npm run build
cp -a dist/* . && rm -rf dist
```

静态文件无需 reload nginx；若改了 nginx 配置则 `sudo systemctl reload nginx`。

## 回滚

```bash
# 更新前备份（建议每次更新前执行）
cp -a /var/www/dsh-desktop /var/www/dsh-desktop.bak-$(date +%s)
# 出问题时恢复
rm -rf /var/www/dsh-desktop && cp -a /var/www/dsh-desktop.bak-XXX /var/www/dsh-desktop
# 备用：GitHub Pages 站点 foxi-ui.github.io/dsh-desktop-community 始终在线
```

---

## 附录 · 常见问题

| 问题 | 处理 |
| --- | --- |
| 80/443 打不开 | 腾讯云控制台 → 安全组 → 放行 80、443 入站 |
| certbot 报域名验证失败 | 确认 DNS：`dig dsh-desktop.bugduo.com` 应返回 124.220.212.192 |
| 图片/字体 404 | 确认构建产物已提升到 `/var/www/dsh-desktop` 根目录（`cp -a dist/* .`） |
| 证书快到期 | `sudo certbot renew --dry-run` 检查；timer 自动续期 |
| 构建失败 | `npm ci` 报错先 `rm -rf node_modules package-lock.json && npm install` 重试（npm 平台依赖已知问题） |
