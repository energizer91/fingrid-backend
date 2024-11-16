import { Module } from '@nestjs/common';
import { FeaturesController } from './features.controller';
import { FeatureService } from './features.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Feature, FeatureSchema } from '../schemas/feature.schema';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Feature.name, schema: FeatureSchema }]),
    UsersModule,
  ],
  controllers: [FeaturesController],
  providers: [FeatureService],
})
export class FeaturesModule {}
