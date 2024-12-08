import { IsNotEmpty, IsNumber, IsString, Matches } from 'class-validator';

export class CreatePartDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description?: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  quantity: number;

  @IsString()
  @Matches(/^[0-9a-fA-F]{24}$/, {
    message: 'subcategory must be a valid ObjectId',
  })
  subcategory: string;
}
