import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileEntity } from '../files/files.entity';
import { ChunkEntity } from '../chunks/entities/chunk.entity';
import { AiService } from '../ai/ai.service';

@Injectable()
export class SummaryService {
    constructor(
        @InjectRepository(FileEntity)
        private readonly fileRepo: Repository<FileEntity>,

        @InjectRepository(ChunkEntity)
        private readonly chunkRepo: Repository<ChunkEntity>,

        private readonly aiService: AiService
    ) { }

    async generate(repositoryId: string) {
        const results = await this.chunkRepo.query(
            `
            SELECT f.path, c.content
            FROM chunks c
            JOIN files f
                ON c."fileId" = f.id
            WHERE f."repositoryId" = $1
            LIMIT 50
            `, [repositoryId]
        )

        const context = results.map(r => `FILE: ${r.path}\n\n${r.content}`).join('\n\n-----------\n\n');

        const prompt = `
            You are analyzing a software repository.
            
            Generate:
            1. Project purpose
            2. Tech stack
            3. Folder structure
            4. Main modules
            5. Important files
            6. Data flow
            7. Architecture summary

            Use only the provided repository context.
            Repository Context:

            ${context}
        `;

        const summary = await this.aiService.ask(prompt);

        return { summary };
    }
}