import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import { EntrepreneurService } from './entrepreneur.service';
import { UpdateEntrepreneurDto } from './dto/update-entrepreneur.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';
import type { RequestWithUser } from '../auth/interface/request.interface';
import { EntrepreneurProfile } from '../entrepreneur/interface/entrepreneur.interface';

@Controller('entrepreneur')
@UseGuards(JwtGuard)
export class EntrepreneurController {
  constructor(private readonly entrepreneurService: EntrepreneurService) {}

  @Get('profile')
  getProfile(@Request() req: RequestWithUser): Promise<EntrepreneurProfile> {
    return this.entrepreneurService.getProfile(req.user.id);
  }

  @Patch('profile')
  updateProfile(
    @Request() req: RequestWithUser,
    @Body() updateDto: UpdateEntrepreneurDto,
  ): Promise<EntrepreneurProfile> {
    return this.entrepreneurService.updateProfile(req.user.id, updateDto);
  }

  @Delete('profile')
  deleteProfile(@Request() req: RequestWithUser): Promise<{ message: string }> {
    return this.entrepreneurService.deleteProfile(req.user.id);
  }
}
