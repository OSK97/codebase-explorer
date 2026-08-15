import { Get, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RepositoryEntity } from './repository.entity';
import { GitService } from '../git/git.service';
import * as path from 'path';
import { ScannerService } from '../scanner/scanner.service';
@Injectable()
export class RepositoriesService {
    constructor(
        @InjectRepository(RepositoryEntity)
        private readonly repositoryRepo: Repository<RepositoryEntity>,
        private readonly gitService: GitService,
        private readonly scannerService: ScannerService,
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
            process.cwd(),
            '..',
            '..',
            'storage',
            'repositories',
            savedRepo.id,
        );
        await this.gitService.cloneRepository(
            savedRepo.githubUrl,
            targetPath,
        );
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
            process.cwd(),
            '..',
            '..',
            'storage',
            'repositories',
            repo.id,
        );

        return this.scannerService.scanDirectory(repoPath);
    }
}
