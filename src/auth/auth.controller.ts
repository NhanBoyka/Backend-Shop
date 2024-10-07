import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('user/login')
  loginUser(@Body() login: LoginDto) {
    return this.authService.validateUser(login);
  }

  @Post('customers/login')
  loginCustomer(@Body() login: LoginDto) {
    return this.authService.validateCustomer(login);
  }
}
