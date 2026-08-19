import { Controller, Get } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
    constructor(
        private readonly searchService: SearchService
    ) { }

    @Get()
    async search() {
        return this.searchService.search(
            'how does repository cloning work?',
        )
    }
}   