import * as bcrypt from 'bcryptjs';
import { Provide } from '@midwayjs/core';
import * as jwt from 'jsonwebtoken';
import { User } from '../entity/user';

const CODE_SUCCESS = 0;
const CODE_ERROR = 1;

@Provide()
export class UserService {
  async findUserByUsername(username) {
    return User.findOne({
      where: {
        username,
      },
    });
  }

  async register(params: { username: string; password: string }) {
    const { username, password } = params;
    let result;

    try {
      result = await this.findUserByUsername(username);
      if (result) {
        return {
          code: CODE_ERROR,
          success: false,
          message: '用户名已存在',
        };
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      result = await User.create({
        username,
        password: hashedPassword,
      });

      return {
        code: CODE_SUCCESS,
        success: true,
        message: '注册成功',
        data: result,
      };
    } catch (err) {
      console.error(err);
      return {
        code: CODE_ERROR,
        success: false,
        message: '注册失败',
        error: err.message,
      };
    }
  }

  async login(params: { username: string; password: string }) {
    const { username, password } = params;
    let result;

    try {
      result = await this.findUserByUsername(username);
      if (!result) {
        return {
          code: CODE_ERROR,
          success: false,
          message: '用户名不存在',
        };
      }

      const isPasswordCorrect = await bcrypt.compare(password, result.password);
      if (!isPasswordCorrect) {
        return {
          code: CODE_ERROR,
          success: false,
          message: '密码错误',
        };
      }

      // User is valid, create a JWT
      const token = jwt.sign(
        { username: result.username, id: result.id },
        'Dadaya',
        { expiresIn: '1h' }
      );

      return {
        code: CODE_SUCCESS,
        success: true,
        message: '登录成功',
        data: {
          username,
          token, // Return the token
        },
      };
    } catch (err) {
      console.error(err);
      return {
        code: CODE_ERROR,
        success: false,
        message: '登录失败',
        error: err.message,
      };
    }
  }
}
