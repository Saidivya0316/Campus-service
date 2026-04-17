#!/bin/bash
# ============================================================
# Campus Service — EC2 Full Deployment Script
# Usage: bash deploy.sh
# ============================================================

set -e  # Exit immediately on any error
echo ""
echo "========================================================"
echo "  🚀 Campus Service — EC2 Deployment Starting"
echo "========================================================"
echo ""

REPO_DIR="/home/ubuntu/Campus-service"
BACKEND_DIR="$REPO_DIR/backend"
FRONTEND_DIR="$REPO_DIR/campus-service"
WEBROOT="/var/www/html"
ENV_FILE="$BACKEND_DIR/.env"

# ─────────────────────────────────────────
# STEP 1: Pull latest code from GitHub
# ─────────────────────────────────────────
echo "📥 [1/7] Pulling latest code from GitHub..."
if [ -d "$REPO_DIR" ]; then
  cd "$REPO_DIR"
  git pull origin main
else
  cd /home/ubuntu
  git clone https://github.com/Saidivya0316/Campus-service.git
  cd "$REPO_DIR"
fi

# ─────────────────────────────────────────
# STEP 2: Create .env if missing
# ─────────────────────────────────────────
echo ""
echo "🔐 [2/7] Checking .env file..."
if [ ! -f "$ENV_FILE" ]; then
  echo "⚠️  .env not found — creating it now..."
  cat > "$ENV_FILE" << 'EOF'
PORT=5000
MONGO_URI=mongodb://saidivya:Saidivya%40123@ac-hjoim7i-shard-00-00.xc4yzrc.mongodb.net:27017,ac-hjoim7i-shard-00-01.xc4yzrc.mongodb.net:27017,ac-hjoim7i-shard-00-02.xc4yzrc.mongodb.net:27017/campusDB?ssl=true&replicaSet=atlas-h0wfk5-shard-0&authSource=admin&retryWrites=true&w=majority
EOF
  echo "✅ .env created at $ENV_FILE"
else
  echo "✅ .env already exists — skipping"
fi

# ─────────────────────────────────────────
# STEP 3: Backend — install & restart
# ─────────────────────────────────────────
echo ""
echo "⚙️  [3/7] Setting up backend..."
cd "$BACKEND_DIR"
npm install --omit=dev

# Start or restart PM2
if pm2 describe campus-backend > /dev/null 2>&1; then
  echo "♻️  Restarting existing PM2 process..."
  pm2 restart campus-backend
else
  echo "🆕 Starting backend with PM2..."
  pm2 start ecosystem.config.cjs
fi
pm2 save

# Wait for backend to boot
sleep 3
echo "🔍 Checking backend health..."
HEALTH=$(curl -s http://localhost:5000/api/health || echo "FAILED")
if echo "$HEALTH" | grep -q "ok"; then
  echo "✅ Backend is healthy: $HEALTH"
else
  echo "❌ Backend health check failed. Showing PM2 logs:"
  pm2 logs campus-backend --lines 20 --nostream
  exit 1
fi

# ─────────────────────────────────────────
# STEP 4: Frontend — install & build
# ─────────────────────────────────────────
echo ""
echo "🏗️  [4/7] Building React frontend (Vite)..."
cd "$FRONTEND_DIR"
npm install
npm run build

if [ ! -d "$FRONTEND_DIR/dist" ]; then
  echo "❌ Vite build failed — dist folder not found!"
  exit 1
fi
echo "✅ Vite build complete"

# ─────────────────────────────────────────
# STEP 5: Deploy frontend to /var/www/html
# ─────────────────────────────────────────
echo ""
echo "📂 [5/7] Deploying frontend to $WEBROOT..."
sudo rm -rf "$WEBROOT"/*
sudo cp -r "$FRONTEND_DIR/dist/." "$WEBROOT/"
echo "✅ Frontend deployed to $WEBROOT"

# ─────────────────────────────────────────
# STEP 6: Configure Nginx
# ─────────────────────────────────────────
echo ""
echo "🌐 [6/7] Configuring Nginx..."
sudo cp "$REPO_DIR/nginx.conf" /etc/nginx/sites-available/campus-service
sudo ln -sf /etc/nginx/sites-available/campus-service /etc/nginx/sites-enabled/campus-service
# Disable default site if it exists
sudo rm -f /etc/nginx/sites-enabled/default

# Test nginx config
if sudo nginx -t; then
  sudo systemctl restart nginx
  echo "✅ Nginx configured and restarted"
else
  echo "❌ Nginx config test failed!"
  exit 1
fi

# ─────────────────────────────────────────
# STEP 7: Final verification
# ─────────────────────────────────────────
echo ""
echo "🔎 [7/7] Running final checks..."

PUBLIC_IP=$(curl -s http://checkip.amazonaws.com || echo "16.171.2.52")

echo ""
echo "========================================================"
echo "  ✅ DEPLOYMENT COMPLETE!"
echo "========================================================"
echo ""
echo "  🌍 Frontend:  http://$PUBLIC_IP"
echo "  🏥 Health:    http://$PUBLIC_IP/api/health"
echo "  📦 Products:  http://$PUBLIC_IP/api/products"
echo ""
echo "  PM2 Status:"
pm2 list
echo ""
echo "  Nginx Status:"
sudo systemctl status nginx --no-pager | head -5
echo ""
echo "  Test health endpoint:"
curl -s "http://localhost:5000/api/health"
echo ""
echo "========================================================"
echo "  🎓 Campus Service is LIVE!"
echo "========================================================"
