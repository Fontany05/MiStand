import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { EntrepreneurService } from './entrepreneur.service';
import { StandResponse } from './interface/stand.interface';

@ApiTags('Stand')
@Controller('stand')
export class StandController {
  constructor(private readonly entrepreneurService: EntrepreneurService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Datos públicos del stand para la vitrina' })
  getStand(@Param('id') id: string): Promise<StandResponse> {
    return this.entrepreneurService.getStand(id);
  }
}
