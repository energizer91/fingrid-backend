import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '../users/users.module';
import { Comment, CommentSchema } from '../schemas/comment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
    UsersModule,
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
