import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { faker } from '@faker-js/faker';
import { Category } from '../parts/schemas/category.schema';
import { Subcategory } from '../parts/schemas/subcategory.schema';
import { Part } from '../parts/schemas/part.schema';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
    @InjectModel(Subcategory.name) private subcategoryModel: Model<Subcategory>,
    @InjectModel(Part.name) private partModel: Model<Part>,
  ) {}

  async seedData() {
    await this.categoryModel.deleteMany({});
    await this.subcategoryModel.deleteMany({});
    await this.partModel.deleteMany({});

    const categories = ['Electronics', 'Hardware'];
    const createdCategories = [];

    for (const name of categories) {
      const category = await this.categoryModel.create({ name });
      createdCategories.push(category);
    }

    const subcategories = [];
    for (const category of createdCategories) {
      const subcategory = await this.subcategoryModel.create({
        name: faker.commerce.department(),
        category: category._id,
      });
      subcategories.push(subcategory);
    }

    for (let i = 0; i < 20; i++) {
      await this.partModel.create({
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.number.int({ min: 10, max: 500 }),
        quantity: faker.number.int({ min: 1, max: 100 }),
        subcategory: faker.helpers.arrayElement(subcategories)._id,
      });
    }
    console.log('Seeding complete!');
  }
}
