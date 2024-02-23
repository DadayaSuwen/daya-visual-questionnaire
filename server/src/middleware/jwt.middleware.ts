import { Provide, Middleware } from '@midwayjs/decorator';
import * as jwt from 'jsonwebtoken';
import { IWebMiddleware, Context } from '@midwayjs/koa';

@Provide()
@Middleware()
export class JwtMiddleware implements IWebMiddleware {
  resolve() {
    return async (ctx: Context, next: () => Promise<any>) => {
      const authHeader = ctx.get('Authorization');
      const token = authHeader.split(' ')[1];
      if (token !== null || token !== undefined || authHeader) {
        try {
          const user = jwt.verify(token, 'Dadaya');
          ctx.userInfo = user;
        } catch (err) {
          ctx.status = 403;
          ctx.body = 'Invalid JWT token';
          return;
        }
      } else {
        ctx.status = 401;
        ctx.body = 'No JWT token provided';
        return;
      }

      await next();
    };
  }
}
