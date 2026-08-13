import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RepositoryEntity } from './repository.entity';
import { RepositoriesService } from './repositories.service';
import { RepositoriesController } from './repositories.controller';


@Module({
  imports: [
    TypeOrmModule.forFeature([RepositoryEntity]),
  ],
  controllers: [RepositoriesController],
  providers: [RepositoriesService],
})
export class RepositoriesModule { }
