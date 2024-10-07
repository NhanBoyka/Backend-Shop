import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Category } from 'src/category/model/category.schema';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { get } from 'mongoose';
import { CategoryUpdateDto } from './dto/update-category.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { ParamPaginationDto } from 'src/common/param-pagination.dto';
import { buildPagination } from 'src/common/commom';
import { RoleAuthGuard } from 'src/auth/guards/role.jwt.guard';
import { Role } from 'src/auth/decorator/role.enum';
import { Roles } from 'src/auth/decorator/role.decorater';

@Controller('categories')
export class CategoryController {
  constructor(private readonly service: CategoryService) {}

  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Roles(Role.ADMIN, Role.USER)
  @Post()
  create(@Body() category: CreateCategoryDto) {
    return this.service.createCategory(category);
  }

  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Roles(Role.ADMIN, Role.USER)
  @Get()
  async getAll(@Query() params: ParamPaginationDto) {
    const categories = await this.service.findAll(params);

    const rootCategories = categories.filter((category) => {
      return !category.parent_id === null;
    });
    return buildPagination<Category>(categories, params, rootCategories);
  }

  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Roles(Role.ADMIN, Role.USER)
  @Get(':id')
  getOne(@Param('id') _id: string) {
    return this.service.findById(_id);
  }

  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Roles(Role.ADMIN, Role.USER)
  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.service.DeleteById(id);
  }

  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Roles(Role.ADMIN, Role.USER)
  @Put(':id')
  updateOne(@Param('id') id: string, @Body() category: CategoryUpdateDto) {
    return this.service.updateById(id, category);
  }

  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Roles(Role.ADMIN, Role.USER)
  @Put(':id/status')
  updateStatus(@Param('id') id: string, @Query('status') status: boolean) {
    return this.service.updateStatusById(id, status);
  }
}
