import { Category } from './../../category/model/category.schema';
export class UpdateProductDto {
  name: string;
  description: string;
  cost: number;
  price: number;
  sale: number;
  stock: number;
  status: boolean;
  Category_id: string;
}
