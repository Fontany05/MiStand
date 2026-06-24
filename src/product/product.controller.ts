import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';
import type { RequestWithUser } from '../auth/interface/request.interface';
import { ProductResponse } from './interface/product.interface';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseGuards(JwtGuard)
  create(
    @Request() req: RequestWithUser,
    @Body() createProductDto: CreateProductDto,
  ): Promise<ProductResponse> {
    return this.productService.createProduct(req.user.id, createProductDto);
  }

  @Get('stand/:entrepreneurId')
  getByStand(
    @Param('entrepreneurId') entrepreneurId: string,
  ): Promise<ProductResponse[]> {
    return this.productService.getProductsByStand(entrepreneurId);
  }

  @Patch(':id')
  @UseGuards(JwtGuard)
  update(
    @Param('id') id: string,
    @Request() req: RequestWithUser,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<ProductResponse> {
    return this.productService.updateProduct(id, req.user.id, updateProductDto);
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  delete(
    @Param('id') id: string,
    @Request() req: RequestWithUser,
  ): Promise<{ message: string }> {
    return this.productService.deleteProduct(id, req.user.id);
  }
}
