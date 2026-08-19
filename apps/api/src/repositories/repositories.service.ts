import { Get, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RepositoryEntity } from './repository.entity';
import { GitService } from '../git/git.service';
import * as path from 'path';
import { ScannerService } from '../scanner/scanner.service';
import { FilesService } from '../files/files.service';
import { ChunksService } from '../chunks/chunks.service';
import { EmbeddingsService } from '../embeddings/embeddings.service';

@Injectable()
export class RepositoriesService {
    constructor(
        @InjectRepository(RepositoryEntity)         //db needed at runtime for ts
        private readonly repositoryRepo: Repository<RepositoryEntity>,          //Repsoitory<> to provide db commands  
        private readonly gitService: GitService,
        private readonly scannerService: ScannerService,
        private readonly filesService: FilesService,
        private readonly chunksService: ChunksService,
        private readonly embeddingsService: EmbeddingsService,
    ) { }

    async findAll() {
        return this.repositoryRepo.find();
    }

    async create(name: string, githubUrl: string) {
        const repo = this.repositoryRepo.create({
            name,
            githubUrl,
        });

        const savedRepo = await this.repositoryRepo.save(repo);
        const targetPath = path.join(
            process.cwd(), '..', '..', 'storage', 'repositories', savedRepo.id);

        await this.gitService.cloneRepository(savedRepo.githubUrl, targetPath);

        savedRepo.status = 'cloned';

        await this.repositoryRepo.save(savedRepo);

        return savedRepo;
    }

    async findOne(id: string) {    //find repo by its id
        return this.repositoryRepo.findOne({ where: { id }, });
    }

    async scan(id: string) {
        const repo = await this.findOne(id);

        if (!repo) {
            throw new Error('Repository not found');
        }

        const repoPath = path.join(
            process.cwd(), '..', '..', 'storage', 'repositories', repo.id,
        );

        return this.scannerService.scanDirectory(repoPath);
    }

    async indexRepository(id: string) {
        const repo = await this.findOne(id);

        if (!repo) {
            throw new Error('Repository not found');
        }

        const repoPath = path.join(
            process.cwd(), '..', '..', 'storage', 'repositories', repo.id,
        );

        const files = await this.scannerService.scanDirectory(repoPath);

        const existingFiles =                                //guard condition to not generate copies of emneddings
            await this.filesService.countByRepository(repo.id);

        if (existingFiles > 0) {
            return { message: 'Repository Already Exists' };
        }

        for (const filePath of files) {


            const fullPath = path.join(repoPath, filePath);

            const content = this.scannerService.readFileContent(fullPath);

            const size = Buffer.byteLength(content);

            const savedFile = await this.filesService.create(repo.id, filePath, content, size, 'unknown');

            const chunks = this.chunksService.splitContent(content);

            for (let i = 0; i < chunks.length; ++i) {

                const savedChunk = await this.chunksService.create(savedFile.id, i, chunks[i]);

                const vector = await this.embeddingsService.generateEmbedding(chunks[i]);

                await this.embeddingsService.create(savedChunk.id, vector);
            }
        }
        return { files: files.length };
    }
}
