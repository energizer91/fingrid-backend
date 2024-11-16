import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Feature } from '../schemas/feature.schema';
import { User } from '../schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class FeatureService {
  constructor(
    @InjectModel(Feature.name) private featureModel: Model<Feature>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async createFeature(
    author: string,
    id: string,
    name: string,
    description: string,
    priority: number,
  ): Promise<Feature> {
    return new this.featureModel({
      author,
      id,
      name,
      description,
      priority,
    }).save();
  }

  async getFeatures(author?: string | undefined): Promise<Feature[]> {
    if (author) {
      return this.featureModel
        .find({ author })
        .populate('author', '', this.userModel)
        .exec();
    }
    return this.featureModel
      .find()
      .populate('author', '', this.userModel)
      .exec();
  }

  async getFeature(featureId: string): Promise<Feature> {
    return this.featureModel
      .findOne({ name: featureId })
      .populate('author', '', this.userModel)
      .exec();
  }

  async updateFeature(id: string, updateData): Promise<Feature> {
    return this.featureModel.findByIdAndUpdate(id, updateData, { new: true });
  }

  async deleteFeature(id: string): Promise<Feature> {
    return this.featureModel.findByIdAndDelete(id);
  }
}
