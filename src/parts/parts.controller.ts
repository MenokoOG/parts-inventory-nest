import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { PartsService } from './parts.service';
import { CreatePartDto } from './dto/create-part.dto';

@Controller('parts')
export class PartsController {
  constructor(private readonly partsService: PartsService) {}

  @Post()
  create(@Body() createPartDto: CreatePartDto) {
    return this.partsService.create(createPartDto);
  }

  @Get()
  findAll() {
    return this.partsService.findAll();
  }

  @Get('inventory-value')
  calculateInventoryValue() {
    return this.partsService.calculateInventoryValue();
  }

  @Get('filter')
  filterParts(
    @Query('category') category: string,
    @Query('subcategory') subcategory: string,
    @Query('limit') limit: number,
    @Query('page') page: number,
  ) {
    const filter: Record<string, any> = {};
    if (subcategory) filter['subcategory'] = subcategory;
    if (category) filter['subcategory.category'] = category;

    return this.partsService.filterParts(filter, limit, page);
  }
}
