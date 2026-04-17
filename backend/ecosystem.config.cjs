module.exports = {
  apps: [
    {
      name: "campus-backend",
      script: "server.js",
      cwd: "/home/ubuntu/Campus-service/backend",
      instances: 1,
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: "production",
        PORT: 5000,
      },
    },
  ],
};
