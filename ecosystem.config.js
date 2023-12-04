module.exports = {
  apps : [{
    name: 'ordering-delivery',
    script: 'server.js',
    autorestart: true,
    watch: false,
    max_memory_restart: '1000M',
    log_date_format: 'YYYY-MM-DD HH:mm:ss',
    merge_logs: true,
    kill_timeout: 30000,
    env: {
      "NODE_ENV": 'development',
      "PORT": 9919,
    },
    env_uat: {
      NODE_ENV: 'uat',
      "PORT": 9919,
    },
    env_production: {
      NODE_ENV: 'production',
      "PORT": 9919,
    }
  }],

  deploy : {
    dev: {
      'user': 'api',
      'host': 'dev',
      'ref': 'origin/dev',
      'repo':
        '',
      'path': `/home/api/ordering-delivery`,
      'pre-deploy': 'git reset --hard HEAD && git fetch --all',
      'post-deploy': `nvm use 16 && rm -rf node_modules/ && npm install --force && pm2 reload ecosystem.config.js --env dev`,
    },
     uat : {
      'user': 'api',
      'host': 'uat',
      'ref': 'origin/uat',
      'repo':
        '',
      'path': `/home/api/ordering-delivery`,
      'pre-deploy': 'git reset --hard HEAD && git fetch --all',
      'post-deploy': `nvm use 16 && rm -rf node_modules/ && npm install --force && pm2 reload ecosystem.config.js --env uat`,
    },
    production : {
      'user': 'api',
      'host': 'prod',
      'ref': 'origin/master',
      'repo':
        '',
      'path': `/home/api/ordering-delivery`,
      'pre-deploy': 'git reset --hard HEAD && git fetch --all',
      'post-deploy': `nvm use 16 && rm -rf node_modules/ && npm install --force && pm2 reload ecosystem.config.js --env production`,
    },
  }
};

