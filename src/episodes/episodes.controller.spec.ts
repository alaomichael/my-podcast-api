import { Test, TestingModule } from '@nestjs/testing';
import { EpisodesController } from './episodes.controller';
import { EpisodesService } from './episodes.service';
import { ConfigModule } from 'src/config/config.module';
import { find } from 'rxjs';

describe('EpisodesController', () => {
  let controller: EpisodesController;

  const mockFindOne = jest.fn();

  const mockEpisodesService = {
    findAll: async (page: number, limit: number, sort: 'asc' | 'desc') => [
      {id: '1', title: 'Episode 1', description: 'Description of Episode 1' }],
    findFeatured: async () => [
      { id: '2', title: 'Episode 2', description: 'Description of Episode 2', featured: true },],
    // findOne: async (id: string) => ({ id, title: 'Episode 1', description: 'Description of Episode 1' }),
    findOne: mockFindOne,
    create: async (input: any) => ({ id: '1', ...input }),
  };


  beforeEach(async () => {
    // Reset the mock function before each test
    jest.resetAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule], // Import ConfigModule to use ConfigService
      providers: [{provide: EpisodesService, useValue: mockEpisodesService}], // No providers needed for this test
      controllers: [EpisodesController],
    }).compile();

    controller = module.get<EpisodesController>(EpisodesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findOne', () => {
    describe('when episode exists', () => {
      const episodeId = '1';
      const mockResult = { id: episodeId, title: 'Episode 1', description: 'Description of Episode 1' };
      
      beforeEach(() => {
        mockFindOne.mockResolvedValue(mockResult);
      } )
  
      it('should call findOne with the correct id', async () => {
        const result = await controller.findOne(episodeId);
        expect(result).toEqual(mockResult);
        expect(mockFindOne).toHaveBeenCalledWith(episodeId);
      } )
  
      it('should call the service method with the correct id', async () => {  
          const result = await controller.findOne(episodeId);
          expect(result).toEqual(mockResult);
          expect(mockFindOne).toHaveBeenCalledTimes(1);
          expect(mockFindOne).toHaveBeenCalledWith(episodeId);
        })
  })
  describe('when episode does not exist', () => {
    const episodeId = '999';
    beforeEach(() => {
      mockFindOne.mockResolvedValue(null);
    } )

    it('should throw NotFoundException if episode not found', async () => {
      mockFindOne.mockResolvedValue(null);
      await expect(controller.findOne(episodeId)).rejects.toThrowError('Episode not found');
    } )

  })
});

});
