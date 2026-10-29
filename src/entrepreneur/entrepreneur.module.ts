import { Module } from '@nestjs/common';
import { EntrepreneurService } from './entrepreneur.service';
import { EntrepreneurController } from './entrepreneur.controller';
import { StandController } from './stand.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [EntrepreneurController, StandController],
  providers: [EntrepreneurService],
})
export class EntrepreneurModule {}
