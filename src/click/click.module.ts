import { Module } from '@nestjs/common';
import { ClickService } from './click.service';
import { ClickController } from './click.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ClickController],
  providers: [ClickService],
})
export class ClickModule {}
