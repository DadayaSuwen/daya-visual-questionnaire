import { Inject, Controller, Post } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { UserService } from '../service/user.service';

@Controller('/api')
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Post('/register')
  async register() {
    const params = this.ctx.request.body as {
      username: string;
      password: string;
    };
    const user = await this.userService.register(params);
    return user;
  }

  @Post('/login')
  async login() {
    const params = this.ctx.request.body as {
      username: string;
      password: string;
    };
    const user = await this.userService.login(params);
    return user;
  }
}
