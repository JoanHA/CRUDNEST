import { Injectable } from '@nestjs/common';
import { CreateBookmarkDto } from './dto';
import { EditBookmarDto } from './dto/edit-bookmark.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Bookmark } from '@prisma/client';
import { create } from 'domain';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}
  async getBookmarks(userId: number) {
    const bookmarks = await this.prisma.bookmark.findMany({
      where: {
        userId,
      },
    });
    return bookmarks;
  }

  async getBookmarksById(userId: number, bookmarkId: number, b) {
    const bookmark = await this.prisma.bookmark.findUnique({
      where: {
        id: bookmarkId,
        userId: userId,
      },
    });
    return bookmark;
  }

  async createBokmark(userId: number, dto: CreateBookmarkDto) {
    const bookmark = await this.prisma.bookmark.create({
      data: {
        title: dto.title,
        description: dto.description,
        link: dto.link,
        userId,
      },
    });
    return bookmark;
  }

  async editBookmarksById(
    userId: number,
    editDto: EditBookmarDto,
    bookmarkId: number,
  ) {}

  async deleteBookmarkById(userId: number, bookmarkId: number) {}
}
