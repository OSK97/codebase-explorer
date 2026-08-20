import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmbeddingsModule } from '../embeddings/embeddings.module';
import { EmbeddingEntity } from '../embeddings/embeddings.entity';
import { SearchService } from './search.service';
import { AiModule } from '../ai/ai.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([EmbeddingEntity]),
        EmbeddingsModule,
        AiModule,
    ],
    providers: [SearchService],
    exports: [SearchService],
})
export class SearchModule { }
