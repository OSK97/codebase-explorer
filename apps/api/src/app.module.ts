import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './users/user.entity';
import { RepositoryEntity } from './repositories/repository.entity'
import { RepositoriesModule } from './repositories/repositories.module';
import { GitService } from './git/git.service';
import { GitModule } from './git/git.module';

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
      entities: [User, RepositoryEntity],
    }),
    RepositoriesModule,
    GitModule,
  ],
  controllers: [AppController],
  providers: [AppService, GitService],
})
export class AppModule { }