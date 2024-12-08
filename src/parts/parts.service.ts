import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Part } from './schemas/part.schema';
import { CreatePartDto } from './dto/create-part.dto';

@Injectable()
export class PartsService {
  constructor(@InjectModel(Part.name) private partModel: Model<Part>) {}

  async create(createPartDto: CreatePartDto): Promise<Part> {
    return await this.partModel.create(createPartDto);
  }

  async findAll(): Promise<Part[]> {
    return this.partModel.find().populate({
      path: 'subcategory',
      populate: { path: 'category' },
    });
  }

  async calculateInventoryValue(): Promise<any> {
    return this.partModel.aggregate([
      {
        $group: {
          _id: null,
          totalInventoryValue: {
            $sum: { $multiply: ['$price', '$quantity'] },
          },
        },
      },
    ]);
  }

  async filterParts(filter: Record<string, any>, limit = 10, page = 1) {
    const query = this.partModel.find(filter).populate({
      path: 'subcategory',
      populate: { path: 'category' },
    });

    return query
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();
  }
}
