module.exports = {
  apps: [
    {
      name: 'FE-BATTLE',
      script: './ws-server.js',
      instances: 1,
      exec_mode: 'fork',
      cwd: './current',
      error_file: '../logs/pm2.err.log',
      out_file: '../logs/pm2.out.log',
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ],
  deploy: {
    production: {
      user: 'altcover',
      host: '45.67.56.165',
      ref: 'origin/master',
      repo: 'git@bitbucket.org:altcover/fe-battle.git',
      path: '/var/www/fe-battle.fun/html',
      'post-deploy': 'yarn && yarn generate && pm2 restart all'
    }
  }
}
