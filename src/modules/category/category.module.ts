import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MulterModule } from '@nestjs/platform-express';
import { Category } from './category.entity';

@Module({
  imports: [
    MikroOrmModule.forFeature({ entities: [Category] }),
    MulterModule.register({ dest: './uploads' }),
  ],
  controllers: [CategoryController],
  providers: [CategoryService]
})
export class CategoryModule {}
