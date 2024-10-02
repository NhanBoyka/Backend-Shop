import { Module } from "@nestjs/common";
import { CategoryController } from "./category.controller";
import { CategoryService } from "./category.service";
import { CategoryRepository } from "./category.repository";
import { DatabaseModule } from "src/Database/Database.module";
import { Category, CategorySchema } from "src/category/model/category.schema";

@Module({
    imports: [
        DatabaseModule,
    DatabaseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
],
    controllers: [CategoryController],
    providers: [CategoryService, CategoryRepository]
})
export class CategoryModule{

}