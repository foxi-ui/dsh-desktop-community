# dsh.bugduo.com 部署方案（Nginx 静态托管）

> 目标：将本站点（静态 React/Vite 单页）部署到云服务器，由 Nginx 托管，
> 域名 **dsh.bugduo.com**，启用 HTTPS。

---

## 1. 架构总览

```
用户浏览器
   │  https://dsh.bugduo.com
   ▼
DNS  A 记录  dsh.bugduo.com ──► 124.220.212.192（腾讯云 CVM）
   │
   ▼
Nginx（80 → 301 跳转 443；443 提供 HTTPS）
   │
   ▼
/var/www/dsh   ← 本地 `npm run build` 产物 dist/（rsync 上传）
```

- 纯静态站点、无后端依赖，Nginx 直接托管构建产物即可
- 站点使用相对路径构建（`base: './'`），部署在域名根路径下开箱即用
- 建议**保留 GitHub Pages 部署作为备用/回滚源**（当前已在线：`foxi-ui.github.io/dsh-desktop-community`）

## 2. 现状核查（已完成）

| 项目 | 状态 |
| --- | --- |
| DNS 解析 | ✅ `dsh.bugduo.com` → `124.220.212.192` 已生效 |
| 服务器端口 | ✅ 22 端口开放（SSH 可用） |
| 本机 SSH 认证 | ⚠️ 本机现有密钥（id_rsa / koviiKey）尝试 root/ubuntu/maweiqiang 均未通过 |
| 构建产物 | ✅ 本地 `npm run build` 正常产出 `dist/` |

## 3. 前置条件（需提供）

部署前需要解决 SSH 访问，任选其一：

- **方式 A（推荐）**：服务器管理员将本机公钥加入授权列表，之后可用密钥免密登录
  ```
  ```
- **方式 B**：提供服务器登录用户名 + 密码（或其它可用密钥）

## 4. 服务器初始化（一次性，需 root/sudo）

```bash
# Ubuntu/Debian
apt update && apt install -y nginx certbot python3-certbot-nginx

# 站点目录
mkdir -p /var/www/dsh

# 放行防火墙（如启用 ufw）
ufw allow 80,443/tcp
```

## 5. Nginx 配置

新建 `/etc/nginx/conf.d/dsh.bugduo.com.conf`：

```nginx
# HTTP → HTTPS 跳转
server {
    listen 80;
    listen [::]:80;
    server_name dsh.bugduo.com;
    return 301 https://$host$request_uri;
}

# HTTPS 站点
server {
    listen 443 ssl;
    listen [::]:443 ssl;
    http2 on;
    server_name dsh.bugduo.com;

    # 证书（第 6 步 certbot 自动生成后生效）
    ssl_certificate     /etc/letsencrypt/live/dsh.bugduo.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/dsh.bugduo.com/privkey.pem;

    root  /var/www/dsh;
    index index.html;

    # 静态单页：找不到文件时回退到 index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    # 带哈希的构建产物可长缓存
    location /assets/ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    # 字体
    location ~* \.(woff2?)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    # gzip 压缩
    gzip on;
    gzip_comp_level 6;
    gzip_min_length 1k;
    gzip_types text/plain text/css application/javascript application/json
               image/svg+xml font/woff2;

    # 安全响应头
    add_header X-Content-Type-Options nosniff always;
    add_header X-Frame-Options SAMEORIGIN always;
    add_header Referrer-Policy strict-origin-when-cross-origin always;
}
```

校验并生效：

```bash
nginx -t && systemctl reload nginx
```

## 6. HTTPS 证书（Let's Encrypt）

```bash
certbot --nginx -d dsh.bugduo.com --agree-tos -m 你的邮箱 --redirect
# 自动续期测试
certbot renew --dry-run
```

> certbot 会自动改写 Nginx 配置中的证书路径与跳转，若第 5 步已写好，
> 也可直接用 `certbot --nginx -d dsh.bugduo.com` 仅补发证书。

## 7. 腾讯云安全组

控制台 → 云服务器 → 安全组：确保放行 **80（HTTP）** 与 **443（HTTPS）** 入站。

## 8. 构建与上传（日常发布）

本地一键脚本 `scripts/deploy.sh`（需先解决第 3 步 SSH 访问）：

```bash
#!/usr/bin/env bash
set -euo pipefail

SERVER="${DEPLOY_SERVER:-root@124.220.212.192}"
REMOTE_DIR="${DEPLOY_DIR:-/var/www/dsh}"

echo "==> 构建"
npm run build

echo "==> 上传 dist/ 到 ${SERVER}:${REMOTE_DIR}"
rsync -avz --delete dist/ "${SERVER}:${REMOTE_DIR}/"

echo "==> 完成"
```

使用：

```bash
chmod +x scripts/deploy.sh
./scripts/deploy.sh
```

> `rsync --delete` 会先清空远端目录再同步，保证与本地 dist 完全一致；
> 建议在服务器保留上一版本备份（`/var/www/dsh.prev`）用于回滚。

## 9. 验证清单

```bash
curl -I https://dsh.bugduo.com                  # 期望 200
curl -s https://dsh.bugduo.com | head -5        # 期望包含 <title>DeepSeek Harness Desktop
curl -I https://dsh.bugduo.com/fonts/fonts.css  # 期望 200
curl -I https://dsh.bugduo.com/icon.png         # 期望 200
openssl s_client -connect dsh.bugduo.com:443 -servername dsh.bugduo.com </dev/null 2>/dev/null \
  | grep -E "subject|issuer"                    # 期望 Let's Encrypt 证书
```

浏览器打开 `https://dsh.bugduo.com` 检查：首屏渲染、字体、图标、各区块滚动显现。

## 10. 自动化部署（可选，二选一或并用）

| 方案 | 说明 |
| --- | --- |
| A. 本地脚本 | `scripts/deploy.sh` 手动触发，简单直接 |
| B. GitHub Actions | push 到 main 自动构建并 rsync 到服务器；需在仓库 Settings → Secrets 配置 `DEPLOY_HOST` / `DEPLOY_USER` / `DEPLOY_KEY`（服务器侧对应公钥） |

## 11. 回滚方案

1. 服务器端：`cp -a /var/www/dsh /var/www/dsh.bak-$(date +%s)`（每次发布前）
2. 出错时：将备份目录恢复为 `/var/www/dsh` 并 `systemctl reload nginx`
3. 备用通道：GitHub Pages 站点始终在线，可临时切换

## 12. 风险与注意事项

- **SSH 凭据**：优先使用密钥登录，禁止 root 密码登录（`PasswordAuthentication no`）
- **证书续期**：certbot 的 systemd timer 会自动续期；每月检查一次 `certbot renew --dry-run`
- **数据安全**：站点无后端与数据库，风险面小；但仍建议开启腾讯云快照
- **防盗链/限流**（可选）：如担心资源被外站盗用，可在 Nginx 增加 `valid_referers` 规则
