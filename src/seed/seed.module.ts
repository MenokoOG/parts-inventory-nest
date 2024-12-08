import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SeedService } from './seed.service';
import { Category, CategorySchema } from '../parts/schemas/category.schema';
import {
  Subcategory,
  SubcategorySchema,
} from '../parts/schemas/subcategory.schema';
import { Part, PartSchema } from '../parts/schemas/part.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
      { name: Subcategory.name, schema: SubcategorySchema },
      { name: Part.name, schema: PartSchema },
    ]),
  ],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}
