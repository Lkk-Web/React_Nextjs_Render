module.exports = {
  apps: [
    {
      name: 'nextjs-ssr-test',
      script: 'npm',
      args: 'start',
      cwd: './',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 30001,
        NEXT_PUBLIC_BASE_PATH: '/next-ssr'
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 30001,
        NEXT_PUBLIC_BASE_PATH: '/next-ssr'
      }
    }
  ]
};