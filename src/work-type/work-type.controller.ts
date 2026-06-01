import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateWorkTypeDto } from './dto/create-work-type.dto';
import { UpdateWorkTypeDto } from './dto/update-work-type.dto';
import { WorkTypeService } from './work-type.service';

@Controller('work-types')
export class WorkTypeController {
  constructor(private readonly workTypeService: WorkTypeService) {}

  @Get()
  findAll() {
    return this.workTypeService.findAll();
  }

  @Post()
  create(@Body() dto: CreateWorkTypeDto) {
    return this.workTypeService.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateWorkTypeDto) {
    return this.workTypeService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workTypeService.remove(id);
  }
}
