import { HttpService } from '@nestjs/axios';
import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

export class AuthGuard implements CanActivate {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  private get authServiceUrl() {
    return this.configService.get<string>('authService.url');
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('Token not found');
    }

    try {
      // Auth Service의 토큰 검증 엔드포인트 호출
      const { data } = await firstValueFrom(
        this.httpService.get(`${this.authServiceUrl}/auth/verify`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      );

      // Request 객체에 사용자 정보 추가
      request.user = data;
      return true;
    } catch (error) {
      throw new UnauthorizedException(`Invalid token : ${error}`);
    }
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
