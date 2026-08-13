import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { RepositoriesService } from './repositories.service';
import { CreateRepositoryDto } from './create-repository.dto';

@Controller('repositories')
export class RepositoriesController {
    constructor(
        private readonly repositoriesService: RepositoriesService,
    ) { }

    @Get()
    findall() {
        return this.repositoriesService.findAll();
    }

    @Get(':id')
    findone(@Param('id') id: string) {
        return this.repositoriesService.findOne(id);
    }


    @Post()
    create(@Body() dto: CreateRepositoryDto) {
        return this.repositoriesService.create(
            dto.name,
            dto.githubUrl,
        );
    }
}   