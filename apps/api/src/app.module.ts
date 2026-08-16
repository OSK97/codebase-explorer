import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserEntity } from './users/user.entity';
import { RepositoryEntity } from './repositories/repository.entity'
import { RepositoriesModule } from './repositories/repositories.module';
import { GitService } from './git/git.service';
import { GitModule } from './git/git.module';
import { ScannerModule } from './scanner/scanner.module';
import { FilesModule } from './files/files.module';
import { FileEntity } from './files/files.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'ai_codebase_explorer',
      autoLoadEntities: true,
      synchronize: true,
      entities: [UserEntity, RepositoryEntity, FileEntity],
    }),
    RepositoriesModule,
    GitModule,
    ScannerModule,
    FilesModule,
  ],
  controllers: [AppController],
  providers: [AppService, GitService],
})
export class AppModule { }