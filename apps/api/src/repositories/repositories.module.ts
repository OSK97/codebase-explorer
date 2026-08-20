import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RepositoryEntity } from './repository.entity';
import { RepositoriesService } from './repositories.service';
import { RepositoriesController } from './repositories.controller';
import { GitModule } from '../git/git.module';
import { ScannerModule } from '../scanner/scanner.module';
import { FilesModule } from '../files/files.module';
import { ChunksModule } from '../chunks/chunks.module';
import { EmbeddingsModule } from '../embeddings/embeddings.module';
import { SearchModule } from '../search/search.module';
import { SummaryModule } from '../summary/summary.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([RepositoryEntity]),
    GitModule,
    ScannerModule,
    FilesModule,
    ChunksModule,
    EmbeddingsModule,
    SearchModule,
    SummaryModule
  ],
  controllers: [RepositoriesController],
  providers: [RepositoriesService],
})
export class RepositoriesModule { }
