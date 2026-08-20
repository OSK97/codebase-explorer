import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { RepositoriesService } from './repositories.service';
import { CreateRepositoryDto } from './create-repository.dto';
import { SearchService } from '../search/search.service';
import { SummaryService } from '../summary/summary.service';

@Controller('repositories')             //endpoints after localhost:3000/repositories
export class RepositoriesController {
    constructor(
        private readonly repositoriesService: RepositoriesService,
        private readonly searchService: SearchService,
        private readonly summaryService: SummaryService,
    ) { }

    @Get()
    findall() {
        return this.repositoriesService.findAll();
    }

    @Get(':id')                             //dynamic url
    findone(@Param('id') id: string) {
        return this.repositoriesService.findOne(id);
    }

    @Get(':id/scan')
    scan(@Param('id') id: string) {
        return this.repositoriesService.scan(id);
    }

    @Post()
    create(@Body() dto: CreateRepositoryDto) {
        return this.repositoriesService.create(
            dto.name,
            dto.githubUrl,
        );
    }

    @Post(':id/index')
    index(@Param('id') id: string) {
        return this.repositoriesService.indexRepository(id);
    }

    @Post(':repositoryId/summary')
    summary(@Param('repositoryId') repositoryId: string) {
        return this.summaryService.generate(repositoryId);
    }

    @Post(':repositoryId/chat')
    chat(
        @Param('repositoryId') repositoryId: string,
        @Body() body: { query: string },
    ) {
        return this.searchService.search(
            repositoryId,
            body.query,
        );
    }
}   