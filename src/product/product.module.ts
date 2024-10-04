import { Module } from '@nestjs/common';
import { ProducController } from './product.controller';
import { ProductService } from './product.service';
import { ProductRepository } from './product.repository';
import { DatabaseModule } from 'src/Database/Database.module';
import { Product, ProductSchema } from './model/product.schema';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { CategoryModule } from 'src/category/category.module';

@Module({
  imports: [
    DatabaseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    CloudinaryModule,
    CategoryModule,
  ],
  controllers: [ProducController],
  providers: [ProductService, ProductRepository],
})
export class ProductModule {}
