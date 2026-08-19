import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmbeddingEntity } from './embeddings.entity';
import ollama from 'ollama';

@Injectable()
export class EmbeddingsService {
    constructor(
        @InjectRepository(EmbeddingEntity)
        private readonly embeddingRepo: Repository<EmbeddingEntity>,
    ) { }


    async create(chunkId: string, vector: number[]) {
        const embedding = this.embeddingRepo.create({ chunkId, vector });

        return this.embeddingRepo.save(embedding);
    }

    async generateEmbedding(text: string) {
        const response = await ollama.embed({
            model: 'nomic-embed-text',
            input: text,
        });

        return response.embeddings[0];
    }
}