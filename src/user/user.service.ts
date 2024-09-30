import { CreateUserDto } from './dto/create-user.dto';
import { User } from './model/user.schema';
import { UserRepository } from './user.repository';
import { Inject, Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(private readonly Repository: UserRepository) {}

    create(User: CreateUserDto) {
            // mã hóa mk
        User.password = bcrypt.hashSync(User.password, 10);
        
        return this.Repository.create(User);
    }

    getAll() {
        return this.Repository.findAll();
    }

    getOne(id: string) {
        return this.Repository.findOne(id);
      }
}