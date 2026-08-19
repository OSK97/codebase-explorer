import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChunkEntity } from './entities/chunk.entity';

@Injectable()
export class ChunksService {
  constructor(
    @InjectRepository(ChunkEntity)
    private readonly chunkRepo: Repository<ChunkEntity>,
  ) { }

  async create(fileId: string, chunkIndex: number, content: string) {
    const chunk = this.chunkRepo.create({ fileId, chunkIndex, content });

    return this.chunkRepo.save(chunk);
  }

  splitContent(content: string) {           //need better chunking 
    const lines = content.split('\n');

    const chunkSize = 50;

    const chunks: string[] = [];

    for (let i = 0; i < lines.length; i += chunkSize) {
      chunks.push(lines.slice(i, i + chunkSize).join('\n'));
    }
    return chunks;
  }
}