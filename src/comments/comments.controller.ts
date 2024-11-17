import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { UserRequest } from '../types/user-request.interface';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get(':entityType/:entityId')
  async getCommentsForEntity(
    @Param('entityType') entityType: string,
    @Param('entityId') entityId: string,
  ) {
    return this.commentsService.getComments(entityType, entityId);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':entityType/:entityId')
  async addComment(
    @Param('entityType') entityType: string,
    @Param('entityId') entityId: string,
    @Body() body,
    @Req() req: UserRequest,
  ) {
    return this.commentsService.addComment(
      req.user?.id,
      entityType,
      entityId,
      body.text,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteComment(@Param('id') id: string) {
    return this.commentsService.deleteComment(id);
  }
}
