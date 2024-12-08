import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PartsService } from './parts.service';
import { PartsController } from './parts.controller';
import { Part, PartSchema } from './schemas/part.schema';
import { Subcategory, SubcategorySchema } from './schemas/subcategory.schema';
import { Category, CategorySchema } from './schemas/category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Part.name, schema: PartSchema },
      { name: Subcategory.name, schema: SubcategorySchema },
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  controllers: [PartsController],
  providers: [PartsService],
  exports: [PartsService], // Optional: Export service if used elsewhere
})
export class PartsModule {}
