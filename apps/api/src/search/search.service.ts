import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmbeddingsService } from '../embeddings/embeddings.service';
import { EmbeddingEntity } from '../embeddings/embeddings.entity';

@Injectable()
export class SearchService {
    constructor(
        private readonly embeddingsService: EmbeddingsService,

        @InjectRepository(EmbeddingEntity)
        private readonly embeddingRepo: Repository<EmbeddingEntity>,
    ) { }

    async search(query: string) {
        const queryvector = await this.embeddingsService.generateEmbedding(query);

        const results = await this.embeddingRepo.query(
            `
            SELECT c.id, c."fileID", c."chunkIndex", c.content FROM embeddings e 
            JOIN chunks c ON e.chunkId = c.id
            ORDER BY e.vector <=> $1
            LIMIT 5
            `, [JSON.stringify(queryvector)]
        )
        return results
    }
}
