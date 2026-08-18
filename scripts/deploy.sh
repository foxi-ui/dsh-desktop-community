#!/usr/bin/env bash
set -euo pipefail

SERVER="${DEPLOY_SERVER:-root@124.220.212.192}"
REMOTE_DIR="${DEPLOY_DIR:-/var/www/dsh}"

echo "==> 构建"
npm run build

echo "==> 上传 dist/ 到 ${SERVER}:${REMOTE_DIR}"
rsync -avz --delete dist/ "${SERVER}:${REMOTE_DIR}/"

echo "==> 完成"
