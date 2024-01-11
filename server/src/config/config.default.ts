import { MidwayConfig } from '@midwayjs/core';
import { Person } from '../entity/person';
import { User } from '../entity/user';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1704936380130_226',
  koa: {
    port: 7001,
  },
  cors: {
    credentials: false,
    maxAge: 60 * 60 * 24 * 30,
  },
  sequelize: {
    dataSource: {
      // 第一个数据源，数据源的名字可以完全自定义
      default: {
        database: 'daya_visual_questionnaire',
        username: 'root',
        password: 'root',
        host: '127.0.0.1',
        port: 3306,
        encrypt: false,
        dialect: 'mysql',
        define: { charset: 'utf8' },
        timezone: '+08:00',
        entities: [Person, User],
        // 本地的时候，可以通过 sync: true 直接 createTable
        sync: true,
        syncOptions: {
          alter: true,
        },
      },
    },
  },
} as MidwayConfig;
