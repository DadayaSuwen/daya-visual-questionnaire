import { Provide } from '@midwayjs/core';
import { IUserOptions } from '../interface';
import { User } from '../entity/user';

@Provide()
export class UserService {
  async getUser(options: IUserOptions) {
    return {
      uid: options.uid,
      username: 'mockedName',
      phone: '12345678901',
      email: 'xxx.xxx@xxx.com',
    };
  }
  async register(params: { username: string; password: string }) {
    // 拿到user
    const { username, password } = params;
    let result;

    try {
      // 查看数据库有没有这个名称
      result = await User.findOne({
        where: {
          username,
        },
      });
      if (result) {
        return {
          success: false,
          message: '用户名已存在',
        };
      }
      result = await User.create({
        username,
        password,
      });
      return {
        success: true,
        message: '注册成功',
        data: result,
      };
    } catch (err) {
      console.error(err);
      return {
        success: false,
        message: '注册失败',
        error: err.message,
      };
    }
  }

  async login(params: { username: string; password: string }) {
    // 拿到user
    const { username, password } = params;
    let result;

    try {
      // 查看数据库有没有这个名称
      result = await User.findOne({
        where: {
          username,
        },
      });
      if (!result) {
        return {
          success: false,
          message: '用户名不存在',
        };
      }
      if (result.password !== password) {
        return {
          success: false,
          message: '密码错误',
        };
      }
      return {
        success: true,
        message: '登录成功',
        data: result,
      };
    } catch (err) {
      console.error(err);
      return {
        success: false,
        message: '登录失败',
        error: err.message,
      };
    }
  }
}
