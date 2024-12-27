import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateProfileDto } from './dto/create-profile.dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto/update-profile.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard/auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseGuards(AuthGuard)
  async createProfile(
    @Request() req,
    @Body() createProfileDto: CreateProfileDto,
  ) {
    return this.userService.createProfile(req.user.id, createProfileDto);
  }

  @Get(':id')
  async getProfile(@Param('id') id: string) {
    return this.userService.getProfile(id);
  }

  @Get('username/:username')
  async getProfileByUsername(@Param('username') username: string) {
    return this.userService.getProfileByUsername(username);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async updateProfile(
    @Param('id') id: string,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.userService.updateProfile(id, updateProfileDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteProfile(@Param('id') id: string) {
    return this.userService.deleteProfile(id);
  }

  @Get('search')
  async searchProfiles(@Query('q') query: string) {
    return this.userService.searchProfiles(query);
  }
}
