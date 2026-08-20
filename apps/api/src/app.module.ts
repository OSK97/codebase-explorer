import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserEntity } from './users/user.entity';
import { ConfigModule } from '@nestjs/config';

import { RepositoryEntity } from './repositories/repository.entity'
import { RepositoriesModule } from './repositories/repositories.module';
import { GitService } from './git/git.service';
import { GitModule } from './git/git.module';
import { ScannerModule } from './scanner/scanner.module';
import { FilesModule } from './files/files.module';
import { FileEntity } from './files/files.entity';
import { ChunksModule } from './chunks/chunks.module';
import { EmbeddingsModule } from './embeddings/embeddings.module';
import { ChunkEntity } from './chunks/entities/chunk.entity';
import { EmbeddingEntity } from './embeddings/embeddings.entity';
import { SearchModule } from './search/search.module';
import { AiModule } from './ai/ai.module';
import { SummaryModule } from './summary/summary.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
      entities: [
        UserEntity,
        RepositoryEntity,
        FileEntity,
        ChunkEntity,
        EmbeddingEntity,
      ],
    }),
    RepositoriesModule,
    GitModule,
    ScannerModule,
    FilesModule,
    ChunksModule,
    EmbeddingsModule,
    SearchModule,
    AiModule,
    SummaryModule,
  ],
  controllers: [AppController],
  providers: [AppService, GitService],
})
export class AppModule { }