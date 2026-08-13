import { Get, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RepositoryEntity } from './repository.entity';
@Injectable()
export class RepositoriesService {
    constructor(
        @InjectRepository(RepositoryEntity)
        private readonly repositoryRepo: Repository<RepositoryEntity>,
    ) { }

    async findAll() {
        return this.repositoryRepo.find();
    }

    async create(name: string, githubUrl: string) {
        const repo = this.repositoryRepo.create({
            name,
            githubUrl,
        });
        return this.repositoryRepo.save(repo);
    }

    async findOne(id: string) {
        return this.repositoryRepo.findOne({
            where: { id },
        });
    }
}
