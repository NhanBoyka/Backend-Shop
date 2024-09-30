import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
@Controller('user')
export class UserController {
    constructor(private readonly Service: UserService) {}

    @Post()
    createUser(@Body() createUserDto: CreateUserDto) {
      return this.Service.create(createUserDto);
    }

    @Get()
    getAllUsers() {
      return this.Service.getAll();

    }

    @Get(':id')
    getUserById( @Param('id') _id: string) {
      return this.Service.getOne(_id);
    }
  }