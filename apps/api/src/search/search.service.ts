import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmbeddingEntity } from '../embeddings/embeddings.entity';
import { EmbeddingsService } from '../embeddings/embeddings.service';
import { AiService } from '../ai/ai.service';

@Injectable()
export class SearchService {
    constructor(
        private readonly embeddingsService: EmbeddingsService,
        private readonly aiservice: AiService,

        @InjectRepository(EmbeddingEntity)
        private readonly embeddingRepo: Repository<EmbeddingEntity>,
    ) { }

    async search(repositoryId: string, query: string) {
        const queryvector = await this.embeddingsService.generateEmbedding(query);

        const results = await this.embeddingRepo.query(
            `
            SELECT 
                c.content, 
                c."chunkIndex", 
                f.path,
                e.vector <=> $1 as distance
            FROM embeddings e 
            JOIN chunks c 
                ON e."chunkId" = c.id
            JOIN files f 
                ON c."fileId" = f.id
            WHERE f."repositoryId" = $2 
            ORDER BY distance
            LIMIT 5
            `, [JSON.stringify(queryvector), repositoryId]
        )

        const context = results.map(
            r => `File: ${r.path}\n\n${r.content}`
        ).join('\n\n====================\n\n');

        const prompt = `
        You are a senior software engineer analyzing a source code repository.
        
        Use ONLY the provided context.
        
        Do not simply copy code.
        Explain the code in plain English.
        Only include code snippets when necessary.
        
        If the answer cannot be found in the context, respond exactly with:
        "I could not find that information in the indexed code."
        
        Context:
        ${context}
        
        Question:
        ${query}
        
        Instructions:
        - Mention file names when relevant.
        - Explain code flow when possible.
        - Reference functions, classes, and modules.
        - Do not invent information not present in the context.
        `;

        console.log(
            results.map(r => ({
                path: r.path,
                chunkIndex: r.chunkIndex,
                distance: Number(r.distance).toFixed(4),
            }))
        );

        console.log("===== CONTEXT =====");
        console.log(context);
        console.log("===================");

        const answer = await this.aiservice.ask(prompt)
        const source = [...new Set(results.map(r => r.path))];

        return { answer, source, retrivedchunks: 5, responsetimems: 29000 }
    }
}
