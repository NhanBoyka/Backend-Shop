import { CategoryModule } from './category/category.module';
import { Module } from '@nestjs/common';
import { DatabaseModule } from './Database/Database.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { CustomerModule } from './customer/customer.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    AuthModule,
    CategoryModule,
    ProductModule,
    CloudinaryModule,
    CustomerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
