import { IsNumber } from 'class-validator';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './model/user.schema';
import { UserRepository } from './user.repository';
import { Inject, Injectable, NotFoundException, UnprocessableEntityException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { ParamPaginationDto } from './dto/param-pagination.dto';
import { UpdateUserDto } from './dto/updateuser.dto';

@Injectable()
export class UserService {
    constructor(private readonly Repository: UserRepository) {}

    async create(user: CreateUserDto) {
        // mã hoá mật khẩu
        user.password = bcrypt.hashSync(user.password, 10);
    
        try {
          return await this.Repository.create(user);
        } catch (error) {
          throw new UnprocessableEntityException('email đã tồn tại');
        }
      }

    getAll(Param: ParamPaginationDto) {

        const {keyword, sort, page, limit} =Param;

        const newSort = sort != 'asc' ? 'desc' : 'asc';

        const filter =
      keyword !== undefined
        ? {
            $or: [
              { name: new RegExp(keyword, 'i') },
              { email: new RegExp(keyword, 'i') },
            ],
          }
        : {};

        console.log('Param', Param);

        return this.Repository.findAll(page, limit, newSort, filter);
    }

    getOne(id: string) {
        return this.Repository.findOne(id, '-password');
      }

      

      async updateUser(id: string, updateUser: UpdateUserDto) {
        try {
          return await this.Repository.updateUser(id, updateUser);
        } catch (error) {
          throw new NotFoundException('Không tìm thấy user');
        }
      }
    
      async deleteUser(id: string) {
        try {
          return await this.Repository.deleteUser(id);
        } catch (error) {
          throw new NotFoundException('Không tìm thấy user');
        }
      }

      async updateStatusUser(id: string, status: boolean) {
        try {
          return await this.Repository.updateStatusUser(id, status);
        } catch (error) {
          throw new NotFoundException('Không tìm thấy user');
        }
      }
}