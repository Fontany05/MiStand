import { Module } from '@nestjs/common';
import { EntrepreneurService } from './entrepreneur.service';
import { EntrepreneurController } from './entrepreneur.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [EntrepreneurController],
  providers: [EntrepreneurService],
})
export class EntrepreneurModule {}
