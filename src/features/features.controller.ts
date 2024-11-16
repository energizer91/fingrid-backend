import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { FeatureService } from './features.service';
import { UserRequest } from '../types/user-request.interface';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('features')
export class FeaturesController {
  constructor(private readonly featureService: FeatureService) {}

  @Get()
  async getFeatures() {
    return this.featureService.getFeatures();
  }

  @Get('my')
  async getMyFeatures(@Req() req: UserRequest) {
    return this.featureService.getFeatures(req.user?.id);
  }

  @Get(':id')
  async getFeature(@Param('id') id: string) {
    const feature = await this.featureService.getFeature(id);

    if (!feature) {
      throw new NotFoundException('Feature not found');
    }

    return feature;
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createFeature(@Req() req: UserRequest, @Body() body) {
    return this.featureService.createFeature(
      req.user?.id,
      body.id,
      body.name,
      body.description,
      body.priority,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateFeature(@Param('id') id: string, @Body() body) {
    return this.featureService.updateFeature(id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteFeature(@Param('id') id: string) {
    return this.featureService.deleteFeature(id);
  }
}
