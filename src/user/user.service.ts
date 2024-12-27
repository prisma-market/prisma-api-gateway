import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { CreateProfileDto } from './dto/create-profile.dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto/update-profile.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  private get userServiceUrl() {
    return this.configService.get<string>('userService.url');
  }

  async createProfile(userId: string, createProfileDto: CreateProfileDto) {
    try {
      const { data } = await firstValueFrom(
        this.httpService.post(
          `${this.userServiceUrl}/api/v1/users`,
          createProfileDto,
          {
            headers: { Authorization: `Bearer ${userId}` },
          },
        ),
      );
      return data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async getProfile(userId: string) {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get(`${this.userServiceUrl}/api/v1/users/${userId}`),
      );
      return data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async getProfileByUsername(username: string) {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get(
          `${this.userServiceUrl}/api/v1/public/users/username/${username}`,
        ),
      );
      return data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async updateProfile(userId: string, updateProfileDto: UpdateProfileDto) {
    try {
      const { data } = await firstValueFrom(
        this.httpService.put(
          `${this.userServiceUrl}/api/v1/users/${userId}`,
          updateProfileDto,
          {
            headers: { Authorization: `Bearer ${userId}` },
          },
        ),
      );
      return data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async deleteProfile(userId: string) {
    try {
      const { data } = await firstValueFrom(
        this.httpService.delete(
          `${this.userServiceUrl}/api/v1/users/${userId}`,
          {
            headers: { Authorization: `Bearer ${userId}` },
          },
        ),
      );
      return data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async searchProfiles(query: string) {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get(
          `${this.userServiceUrl}/api/v1/public/users/search?q=${query}`,
        ),
      );
      return data;
    } catch (error) {
      this.handleError(error);
    }
  }

  private handleError(error: any) {
    if (error.response) {
      throw new HttpException(error.response.data, error.response.status);
    }
    throw new HttpException(
      'Internal server error',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
