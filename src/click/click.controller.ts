import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ClickService } from './click.service';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { ClickMetrics, ClickResponse } from './interface/click.interface';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Click')
@Controller('click')
export class ClickController {
  constructor(private readonly clickService: ClickService) {}

  @Post(':productId')
  @ApiOperation({ summary: 'Registro de click' })
  registerClick(@Param('productId') productId: string): Promise<ClickResponse> {
    return this.clickService.registerClick(productId);
  }

  @Get(':productId/metrics')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Listar las metricas de los clicks' })
  @UseGuards(JwtGuard)
  getMetrics(@Param('productId') productId: string): Promise<ClickMetrics> {
    return this.clickService.getClickMetrics(productId);
  }
}
