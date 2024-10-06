import { Injectable } from '@nestjs/common';
import { Customer } from './model/customer.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Injectable()
export class CustomerRepository {
  constructor(
    @InjectModel(Customer.name) private readonly model: Model<Customer>,
  ) {}

  async create(customer: CreateCustomerDto) {
    return await this.model.create({
      _id: new Types.ObjectId(),
      ...customer,
    });
  }
}
