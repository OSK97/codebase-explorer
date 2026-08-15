import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RepositoryEntity } from './repository.entity';
import { RepositoriesService } from './repositories.service';
import { RepositoriesController } from './repositories.controller';
import { GitModule } from '../git/git.module';
import { ScannerModule } from '../scanner/scanner.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([RepositoryEntity]),
    GitModule,
    ScannerModule,
  ],
  controllers: [RepositoriesController],
  providers: [RepositoriesService],
})
export class RepositoriesModule { }
