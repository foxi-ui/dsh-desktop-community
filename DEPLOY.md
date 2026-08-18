# dsh-desktop.bugduo.com 服务器部署操作手册

> 适用：本人手动在云服务器上操作。服务器为腾讯云（`124.220.212.192`），系统按 Ubuntu/Debian 编写。
> 全程约 10 分钟。站点为纯静态单页，Nginx 托管 `dist/` 构建产物，HTTPS 用 Let's Encrypt。

---

## 第 0 步 · 本地准备（在 Mac 上）

```bash
cd /Users/maweiqiang/workspace/work_tools/dsh-web-site

# 1) 构建产物
npm run build          # 生成 dist/

# 2) 确认能 SSH 登录服务器（任选一种账号；如失败先解决第 0.1 节）
ssh root@124.220.212.192 "echo 登录成功"
```

### 0.1 若 SSH 登录失败

将本机公钥加入服务器授权（需先在服务器控制台用 VNC/密码登录一次，执行）：

```bash
# 在服务器上执行（把下面整行公钥追加到 authorized_keys）
mkdir -p ~/.ssh && chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
```

---

## 第 1 步 · 服务器安装软件（root / sudo）

```bash
sudo apt update
sudo apt install -y nginx certbot python3-certbot-nginx
```

> 若为 CentOS：`sudo yum install -y nginx certbot python3-certbot-nginx`

## 第 2 步 · 创建站点目录

```bash
sudo mkdir -p /var/www/dsh
sudo chown -R $USER:$USER /var/www/dsh   # 方便直接用当前用户上传
```

## 第 3 步 · 上传站点文件（二选一）

### 方式 A：本地 rsync 推送（推荐，在 Mac 上执行）

```bash
cd /Users/maweiqiang/workspace/work_tools/dsh-web-site
rsync -avz --delete dist/ root@124.220.212.192:/var/www/dsh/
```

### 方式 B：服务器上拉取 GitHub 构建

服务器安装 Node 22 后：

```bash
cd /var/www/dsh
git clone https://github.com/foxi-ui/dsh-desktop-community.git .
npm ci && npm run build
# 把 dist 内容提升到站点根目录
sudo cp -a dist/* . && sudo rm -rf dist
```

> 推荐方式 A：产物与本地一致，无需服务器装 Node。

## 第 4 步 · 写 Nginx 配置

```bash
sudo vi /etc/nginx/conf.d/dsh-desktop.bugduo.com.conf
```

粘贴以下完整内容（先不含证书路径，第 6 步 certbot 会自动补齐；也可直接粘贴，certbot 会覆盖）：

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

    # 第 6 步 certbot 会自动生成并替换为真实证书路径
    ssl_certificate     /etc/letsencrypt/live/dsh-desktop.bugduo.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/dsh-desktop.bugduo.com/privkey.pem;

    root  /var/www/dsh;
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

> 若第 6 步先执行 certbot，`ssl_certificate` 两行会被自动写入，无需手动改。

校验配置：

```bash
sudo nginx -t && sudo systemctl reload nginx
```

## 第 5 步 · 先验证 HTTP 可访问（证书未签前会 301 到 https 报错属正常）

```bash
curl -I http://dsh-desktop.bugduo.com
# 期望：HTTP/1.1 301 ... Location: https://dsh-desktop.bugduo.com/
```

## 第 6 步 · 签发 HTTPS 证书

```bash
sudo certbot --nginx -d dsh-desktop.bugduo.com --agree-tos --redirect -m 你的邮箱@example.com
```

- `--redirect` 自动把 HTTP 跳转 HTTPS
- 自动续期由系统 timer 负责，验证一次：

```bash
sudo certbot renew --dry-run
```

## 第 7 步 · 验证上线

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

## 日常更新（下次发新版）

```bash
# Mac 上：构建 + 推送（一步到位）
cd /Users/maweiqiang/workspace/work_tools/dsh-web-site
rsync -avz --delete dist/ root@124.220.212.192:/var/www/dsh/
# 静态文件无需 reload nginx；若改了 nginx 配置则 sudo systemctl reload nginx
```

## 回滚

```bash
# 发布前备份（建议每次发布前执行）
sudo cp -a /var/www/dsh /var/www/dsh.bak-$(date +%s)
# 出问题时恢复
sudo rm -rf /var/www/dsh && sudo cp -a /var/www/dsh.bak-XXX /var/www/dsh
# 备用：GitHub Pages 站点 foxi-ui.github.io/dsh-desktop-community 始终在线
```

---

## 附录 · 常见问题

| 问题 | 处理 |
| --- | --- |
| 80/443 打不开 | 腾讯云控制台 → 安全组 → 放行 80、443 入站 |
| `certbot` 报域名验证失败 | 确认 DNS 已生效：`dig dsh-desktop.bugduo.com` 应返回 124.220.212.192 |
| 图片/字体 404 | 确认 rsync 上传完整、目录为 `/var/www/dsh` |
| 证书快到期 | `sudo certbot renew --dry-run` 检查；timer 自动续期 |
| 想换部署方式 | 仓库 `DEPLOY.md` 有 GitHub Actions 自动部署（Secrets 配 `DEPLOY_KEY` 等）方案 |
