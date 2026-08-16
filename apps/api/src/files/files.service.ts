import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileEntity } from './files.entity';
@Injectable()
export class FilesService {
    constructor(
        @InjectRepository(FileEntity)
        private readonly fileRepo: Repository<FileEntity>,
    ) { }

    async create(repositoryId: string, path: string, content: string, size: number, language: string) {
        const file = this.fileRepo.create({    //crerate file obj & save in db
            repositoryId, path, content, size, language
        });
        return this.fileRepo.save(file);
    }
}