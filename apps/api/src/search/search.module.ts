import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmbeddingsModule } from '../embeddings/embeddings.module';
import { EmbeddingEntity } from '../embeddings/embeddings.entity';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([EmbeddingEntity]),
        EmbeddingsModule,
    ],
    providers: [SearchService],
    exports: [SearchService],
    controllers: [SearchController],
})
export class SearchModule { }
