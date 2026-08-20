import { Module } from '@nestjs/common';
import { SummaryService } from './summary.service';
import { SummaryController } from './summary.controller';
import { AiModule } from '../ai/ai.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from '../files/files.entity';
import { ChunkEntity } from '../chunks/entities/chunk.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([FileEntity]),
    TypeOrmModule.forFeature([ChunkEntity]),
    AiModule,
  ],
  providers: [SummaryService],
  controllers: [SummaryController],
  exports: [SummaryService],
})
export class SummaryModule { }
