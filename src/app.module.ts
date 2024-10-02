import { CategoryModule } from './category/category.module';
import { Module } from '@nestjs/common';
import { DatabaseModule } from './Database/Database.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [DatabaseModule, UserModule, AuthModule, CategoryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
