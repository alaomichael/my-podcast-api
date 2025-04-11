import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';

@Module({
  providers: [ConfigService],
  exports: [ConfigService], // Export the ConfigService so it can be used in other modules  
})
export class ConfigModule {}
