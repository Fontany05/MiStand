import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EntrepreneurProfile } from './interface/entrepreneur.interface';
import type { UpdateEntrepreneurDto } from './dto/update-entrepreneur.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EntrepreneurService {
  constructor(private readonly prisma: PrismaService) {}

  async getProfile(id: string): Promise<EntrepreneurProfile> {
    const entrepreneur = await this.prisma.entrepreneur.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        standName: true,
        description: true,
        currentLocation: true,
        phone: true,
        createdAt: true,
      },
    });

    if (!entrepreneur) {
      throw new NotFoundException('Entrepreneur not found');
    }

    return entrepreneur;
  }

  async updateProfile(
    id: string,
    updateDto: UpdateEntrepreneurDto,
  ): Promise<EntrepreneurProfile> {
    const entrepreneur = await this.prisma.entrepreneur.findUnique({
      where: { id },
    });

    if (!entrepreneur) {
      throw new NotFoundException('Entrepreneur not found');
    }

    if (updateDto.password) {
      updateDto.password = await bcrypt.hash(updateDto.password, 10);
    }

    return this.prisma.entrepreneur.update({
      where: { id },
      data: updateDto,
      select: {
        id: true,
        name: true,
        email: true,
        standName: true,
        description: true,
        currentLocation: true,
        phone: true,
        createdAt: true,
      },
    });
  }

  async deleteProfile(id: string): Promise<{ message: string }> {
    const entrepreneur = await this.prisma.entrepreneur.findUnique({
      where: { id },
    });

    if (!entrepreneur) {
      throw new NotFoundException('Entrepreneur not found');
    }

    await this.prisma.entrepreneur.delete({
      where: { id },
    });

    return { message: 'Account deleted successfully' };
  }
}
