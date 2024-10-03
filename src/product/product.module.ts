import { Module } from '@nestjs/common';
import { ProducController } from './product.controller';
import { ProductService } from './product.service';
import { ProductRepository } from './product.repository';

@Module({
  imports: [],
  controllers: [ProducController],
  providers: [ProductService, ProductRepository],
})
export class ProductModule {}
