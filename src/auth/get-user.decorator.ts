import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Auth } from './schemas/auth.schema';

export const GetUser = createParamDecorator((_data, ctx: ExecutionContext): Auth => {
    const req = ctx.switchToHttp().getRequest();

    return req.auth;
});