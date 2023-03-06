<?php
namespace Deployer;

require 'recipe/common.php';

// Config

set('repository', 'git@github.com:user/project.git');
set('keep_releases', 5);

add('shared_files', []);
add('shared_dirs', []);
add('writable_dirs', []);

// Hosts
host('xx.xx.xx.xx')
  ->set('remote_user', 'root')
  ->set('deploy_path', '/var/www/html/node_dir');

// Hooks
after('deploy:failed', 'deploy:unlock');

desc('Installs pnpm packages');
task('pnpm:vendors', function () {
  run('cd {{release_or_current_path}} && pnpm i');
});

desc('Build source');
task('pnpm:build', function () {
  run('cd {{release_or_current_path}} && pnpm run build');
});

desc('Restart pm2');
task('pm2:restart', function () {
  run('cd {{release_or_current_path}} && pm2 delete ecosystem.config.js');
  run('cd {{release_or_current_path}} && pm2 start ecosystem.config.js');
});

desc('Test site');
task('test:api', function () {
  run('cd {{release_or_current_path}} && pnpm run test:api');
});

desc('Deploys your project');
task('deploy', [
  'deploy:prepare',
  'pnpm:vendors',
  'pnpm:build',
  'deploy:publish',
  'pm2:restart',
]);
