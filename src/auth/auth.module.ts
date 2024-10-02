import { UserModule } from './../user/user.module';
import { Controller, Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { JwtModule } from "@nestjs/jwt";


@Module({
    imports: [
        UserModule,
        JwtModule.registerAsync({
        useFactory: () => ({
          secret:
            'vVarX3ETLuR35pAe8LLVSEieaIxvBrz6X2B0eiN1HY4cdf3jYwBUKISJhDDXD60gsZiL9HLTYPoVwrSGa628XGmjJkGF04J3f4On',
          signOptions: {
            expiresIn: '24h',
            algorithm: 'HS256',
          },
        }),
      }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],

})
export class AuthModule {

}