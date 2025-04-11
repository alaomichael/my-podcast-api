import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateEpisodeDto } from './dto/create-episode.dto';

export interface Episode {
    id: string;
    title: string;
    description: string;
    featured?: boolean; // Optional property to indicate if the episode is featured
}

// interface CreateEpisodeDto { 
//      id: string;
//      title: string; 
//      description: string; 
//      featured?: boolean
// }

@Injectable()
export class EpisodesService {
    private episodes: Episode[] = [
        { id: '1', title: 'Episode 1', description: 'Description of Episode 1' },
        { id: '2', title: 'Episode 2', description: 'Description of Episode 2', featured: true },
        { id: '3', title: 'Episode 3', description: 'Description of Episode 3' },
        { id: '4', title: 'Episode 4', description: 'Description of Episode 4', featured: true },
        { id: '5', title: 'Episode 5', description: 'Description of Episode 5' },
    ];

    async findAll(page: number, limit: number, sort: 'asc' | 'desc'): Promise<Episode[]> {
        const sortAsc = (a: Episode, b: Episode) => (a.title > b.title ? 1 : -1);
        const sortDesc = (a: Episode, b: Episode) => (a.title < b.title ? 1 : -1);

        return sort === 'asc'
            ? this.episodes.sort(sortAsc).slice((page - 1) * limit, page * limit)
            : this.episodes.sort(sortDesc).slice((page - 1) * limit, page * limit);
    }

   async  findFeaturedEpisodes() {
        return this.episodes.filter(episode => episode.featured);
    }

    async findOne(id: string): Promise<Episode | undefined> {
        return this.episodes.find(episode => episode.id === id);
    }

    async create(createEpisodeDto: CreateEpisodeDto) {
        const newEpisode = { ...createEpisodeDto, id: randomUUID() };
        this.episodes.push(newEpisode);

        return newEpisode;
    }        
}
