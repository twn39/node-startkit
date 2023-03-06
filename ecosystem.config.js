module.exports = {
  apps: [
    {
      name: 'node-server',
      script: 'dist/main.js',
      instances: 2,
      exec_mode: 'cluster',
      max_memory_restart: '150M',
      env: {
        PORT: 3040,
        APP_ENV: 'prod',
        NODE_ENV: 'production',
      },
    },
  ],
};
