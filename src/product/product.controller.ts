import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';
import type { RequestWithUser } from '../auth/interface/request.interface';
import { ProductResponse } from './interface/product.interface';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FilterProductDto } from './dto/filter-product.dto';
import { PaginatedProductResponse } from './interface/product.interface';
import {
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes } from '@nestjs/swagger';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      required: ['name', 'description', 'price', 'photo'],
      properties: {
        name: { type: 'string', example: 'Taza artesanal' },
        description: { type: 'string', example: 'Taza hecha a mano' },
        price: { type: 'number', example: 1500 },
        photo: { type: 'string', format: 'binary' },
      },
    },
  })
  @ApiOperation({ summary: 'Crear producto con foto' })
  @UseInterceptors(FileInterceptor('photo'))
  create(
    @Request() req: RequestWithUser,
    @Body() createProductDto: CreateProductDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }),
          new FileTypeValidator({ fileType: /^image\/(jpeg|png|webp)$/ }),
        ],
      }),
    )
    file: Express.Multer.File,
  ): Promise<ProductResponse> {
    return this.productService.createProduct(
      req.user.id,
      createProductDto,
      file,
    );
  }

  @Get('stand/:entrepreneurId')
  @ApiOperation({ summary: 'Mostrar producto' })
  getByStand(
    @Param('entrepreneurId') entrepreneurId: string,
    @Query() filters: FilterProductDto,
  ): Promise<PaginatedProductResponse> {
    return this.productService.getProductsByStand(entrepreneurId, filters);
  }

  @Patch(':id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar dato del producto' })
  update(
    @Param('id') id: string,
    @Request() req: RequestWithUser,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<ProductResponse> {
    return this.productService.updateProduct(id, req.user.id, updateProductDto);
  }
  @Delete(':id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar producto' })
  delete(
    @Param('id') id: string,
    @Request() req: RequestWithUser,
  ): Promise<{ message: string }> {
    return this.productService.deleteProduct(id, req.user.id);
  }
}
