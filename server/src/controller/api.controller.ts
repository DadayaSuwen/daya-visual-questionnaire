import { Context } from '@midwayjs/koa';
import { Controller, Get, Inject } from '@midwayjs/decorator';

@Controller('/api')
export class APIController {
  @Inject()
  ctx: Context;

  @Get('/info')
  async getUser() {
    const user = this.ctx.userInfo;
    if (user) {
      const { username } = user;
      return { success: true, message: 'ok', data: { username } };
    } else {
      return { success: false, message: '请登录' };
    }
  }
}
