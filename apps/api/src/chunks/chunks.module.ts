import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChunksService } from './chunks.service';
import { ChunksController } from './chunks.controller';
import { ChunkEntity } from './entities/chunk.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChunkEntity]),
  ],
  controllers: [ChunksController],
  providers: [ChunksService],
  exports: [ChunksService],
})
export class ChunksModule { }
