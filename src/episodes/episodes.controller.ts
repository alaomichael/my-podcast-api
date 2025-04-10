import { Controller, Get, Param, Post, Query } from '@nestjs/common';

@Controller('episodes')
export class EpisodesController {
    @Get()
    findAll(@Query('page') page: number, @Query('limit') limit: number, @Query('sort') sort: 'asc' | 'desc') {
        if (page && limit && sort) return `This action returns all episodes with page ${page}, limit ${limit}, and sort ${sort}`;
        return `This action returns all episodes with page ${page}, limit ${limit}, and sort ${sort}`;
    }

    @Get('featured')
    findFeatured() {
        return 'This action returns all featured episodes';
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return `This action returns a #${id} episode`;
    }

    @Post()
    create() {
        return 'This action adds a new episode';
    }

}
