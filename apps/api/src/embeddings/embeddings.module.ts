import { Module } from '@nestjs/common';
import { EmbeddingsService } from './embeddings.service';
import { EmbeddingEntity } from './embeddings.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([EmbeddingEntity]),
  ],
  providers: [EmbeddingsService],
  exports: [EmbeddingsService],
})
export class EmbeddingsModule { }
