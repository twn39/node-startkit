import * as process from 'process';

class AppConfig {
  env = process.env.NODE_ENV;
  redis = {
    host: '127.0.0.1',
    port: 6379,
    username: null,
    password: null,
    db: 0,
  };
}

export default AppConfig;
