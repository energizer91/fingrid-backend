import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { Comment } from '../schemas/comment.schema';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async addComment(
    author: string,
    entityType: string,
    entityId: string,
    text: string,
  ): Promise<Comment> {
    return new this.commentModel({
      author,
      entityType,
      entityId,
      text,
    }).save();
  }

  async getComments(entityType: string, entityId: string): Promise<Comment[]> {
    return this.commentModel
      .find({ entityType, entityId })
      .populate('author', '', this.userModel)
      .exec();
  }

  async deleteComment(id: string): Promise<Comment> {
    return this.commentModel.findByIdAndDelete(id);
  }
}
