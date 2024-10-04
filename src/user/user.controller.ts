import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ParamPaginationDto } from '../common/param-pagination.dto';
import { User } from './model/user.schema';
import { UpdateUserDto } from './dto/updateuser.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Role } from 'src/auth/decorator/role.enum';
import { Roles } from 'src/auth/decorator/role.decorater';
import { RoleAuthGuard } from 'src/auth/guards/role.jwt.guard';
import { buildPagination } from 'src/common/commom';
@Controller('users')
export class UserController {
  constructor(private readonly Service: UserService) {}
  // tạo user
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Roles(Role.ADMIN)
  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.Service.create(createUserDto);
  }

  // sửa
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  @Put(':id')
  updateUser(@Param('id') _id: string, @Body() updateUser: UpdateUserDto) {
    return this.Service.updateUser(_id, updateUser);
  }

  // thay đôir trạng thái
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  @Put(':id/status')
  updateStatusUser(@Param('id') _id: string, @Query('status') status: boolean) {
    return this.Service.updateStatusUser(_id, status);
  }

  // lấy all có tìm kiếm
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  @Get()
  async getAllUsers(@Query() page: ParamPaginationDto) {
    const listUsers = await this.Service.getAll(page);
    return buildPagination<User>(listUsers, page);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  async deleteUser(@Param('id') _id: string) {
    await this.Service.deleteUser(_id);

    return 'Xoá user thành công!';
  }

  // lấy user theo id
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  @Get(':id')
  getUserById(@Param('id') _id: string) {
    return this.Service.getOne(_id);
  }
}
