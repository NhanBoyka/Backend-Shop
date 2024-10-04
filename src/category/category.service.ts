import { Category } from 'src/category/model/category.schema';
import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Types } from 'mongoose';
import { CategoryRepository } from './category.repository';
import { CategoryUpdateDto } from './dto/update-category.dto';
import { ParamPaginationDto } from 'src/common/param-pagination.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly repository: CategoryRepository) {}
  async createCategory(createCategoryDto: CreateCategoryDto) {
    const { name, status, parent_id } = createCategoryDto;

    const checkParent = parent_id !== '' ? parent_id : null;

    try {
      if (parent_id !== '') {
        const idValid = Types.ObjectId.isValid(parent_id);
        if (!idValid) {
          throw new UnprocessableEntityException('parent_id khong hop le');
        }

        const parent = await this.repository.findOne(parent_id);
        if (!parent) {
          throw new NotFoundException('Không tìm thấy category id');
        }
      }
      return await this.repository.create({
        name,
        status,
        parent_id: checkParent,
      });
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
  }

  findAll(params: ParamPaginationDto) {
    const { page, limit, sort, keyword } = params;

    const newSort = sort != 'asc' ? 'desc' : 'asc';

    return this.repository.findAll(page, limit, newSort, keyword);
  }

  async findById(id: string) {
    const category = await this.repository.findOne(id);
    if (!category) {
      throw new NotFoundException('không tìm thấy danh mục');
    }

    return category;
  }

  async DeleteById(id: string) {
    const category = await this.findById(id);

    if (category.children.length > 0) {
      throw new UnprocessableEntityException(
        'Category này vẫn còn danh mục con',
      );
    }

    await this.repository.DeleteOne(category._id.toHexString());

    return category;
  }

  async updateById(id: string, categoryUpdate: CategoryUpdateDto) {
    const { name, status, parent_id } = categoryUpdate;
    const checkParent = parent_id !== '' ? parent_id : null;

    if (parent_id !== '') {
      const idValid = Types.ObjectId.isValid(parent_id);
      if (!idValid) {
        throw new UnprocessableEntityException('parent_id khong hop le');
      }

      const parent = await this.repository.findOne(parent_id);
      if (!parent) {
        throw new NotFoundException('Không tìm thấy category id');
      }
    }

    const idValid = Types.ObjectId.isValid(id);
    if (!idValid) {
      throw new UnprocessableEntityException('id khong hop le');
    }

    const category = await this.findById(id);
    if (category.children.length > 0) {
      throw new UnprocessableEntityException(
        'Danh muc co danh muc con, không thể thay đổi lại',
      );
    }
    return await this.repository.updateOne(id, category, {
      name,
      status,
      parent_id: checkParent,
    });
  }

  async updateStatusById(id: string, status: boolean) {
    const idValid = Types.ObjectId.isValid(id);
    if (!idValid) {
      throw new UnprocessableEntityException('id này khong hop le');
    }

    const category = await this.repository.updateStatusById(id, status);
    if (!category) {
      throw new NotFoundException('không tìm thấy id danh mục');
    }

    return category;
  }
}
