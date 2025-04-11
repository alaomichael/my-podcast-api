import { Body, Controller, Get, NotFoundException, Param, Post, Query } from '@nestjs/common';
import { EpisodesService } from './episodes.service';
import { Episode } from './episodes.service'; // Import the Episode type
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { ConfigService } from 'src/config/config.service';

@Controller('episodes')
export class EpisodesController {
    constructor(
        private episodesService: EpisodesService,
        private configService: ConfigService, // Inject ConfigService to use it in the controller
    ) {}

    async findAll(@Query('page') page: number, @Query('limit') limit: number, @Query('sort') sort: 'asc' | 'desc'): Promise<Episode[]> {
        if (page && limit && sort) console.log(`This action returns all episodes with page ${page}, limit ${limit}, and sort ${sort}`);
        return await this.episodesService.findAll(page, limit, sort);
    }

    @Get('featured')
    findFeaturedEpisodes() {
        return this.episodesService.findFeaturedEpisodes();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
       const episode = await this.episodesService.findOne(id);
       if (!episode) throw new NotFoundException(`Episode not found`);
       return episode;
    }

    @Post()
    create(@Body() input: CreateEpisodeDto) {
        return this.episodesService.create(input);
    }

}
