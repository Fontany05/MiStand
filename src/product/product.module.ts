import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { PrismaModule } from '../prisma/prisma.module';
import { ProductController } from './product.controller';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [PrismaModule, CloudinaryModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
