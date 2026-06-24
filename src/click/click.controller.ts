import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ClickService } from './click.service';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { ClickMetrics, ClickResponse } from './interface/click.interface';

@Controller('click')
export class ClickController {
  constructor(private readonly clickService: ClickService) {}

  @Post(':productId')
  registerClick(@Param('productId') productId: string): Promise<ClickResponse> {
    return this.clickService.registerClick(productId);
  }

  @Get(':productId/metrics')
  @UseGuards(JwtGuard)
  getMetrics(@Param('productId') productId: string): Promise<ClickMetrics> {
    return this.clickService.getClickMetrics(productId);
  }
}
