import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ConstructionJournalService } from './construction-journal.service';
import { CreateConstructionJournalDto } from './dto/create-construction-journal.dto';
import { UpdateConstructionJournalDto } from './dto/update-construction-journal.dto';

@Controller('construction-journals')
export class ConstructionJournalController {
  constructor(
    private readonly constructionJournalService: ConstructionJournalService,
  ) {}

  @Get()
  findAll(
    @Query('completedAtFrom') completedAtFrom?: string,
    @Query('completedAtTo') completedAtTo?: string,
    @Query('sortBy') sortBy?: string,
    @Query('sortOrder') sortOrder?: string,
  ) {
    const normalizedSortBy =
      sortBy === 'completedAt' || sortBy === 'createdAt' || sortBy === 'volume'
        ? sortBy
        : 'completedAt';
    const normalizedSortOrder = sortOrder === 'asc' ? 'asc' : 'desc';

    return this.constructionJournalService.findAll(
      completedAtFrom,
      completedAtTo,
      normalizedSortBy,
      normalizedSortOrder,
    );
  }

  @Post()
  create(@Body() dto: CreateConstructionJournalDto) {
    return this.constructionJournalService.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateConstructionJournalDto) {
    return this.constructionJournalService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.constructionJournalService.remove(id);
  }
}
