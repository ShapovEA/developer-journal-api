import { Injectable, NotFoundException } from '@nestjs/common';
import { throwPrismaError } from '../common/prisma-error.helper';
import { WorkTypeDal } from '../dal/work-type/work-type.dal';
import { CreateWorkTypeDto } from './dto/create-work-type.dto';
import { UpdateWorkTypeDto } from './dto/update-work-type.dto';

@Injectable()
export class WorkTypeService {
  constructor(private readonly workTypeDal: WorkTypeDal) {}

  findAll() {
    return this.workTypeDal.findMany({
      orderBy: { name: 'asc' },
    });
  }

  async create(dto: CreateWorkTypeDto) {
    try {
      return await this.workTypeDal.create({
        data: {
          name: dto.name.trim(),
          unit: dto.unit,
        },
      });
    } catch (error) {
      throwPrismaError(error, {
        P2002: 'Такой тип работы уже существует',
      });
    }
  }

  async update(id: string, dto: UpdateWorkTypeDto) {
    await this.ensureExists(id);

    try {
      return await this.workTypeDal.update({
        where: { id },
        data: {
          name: dto.name?.trim(),
          unit: dto.unit,
        },
      });
    } catch (error) {
      throwPrismaError(error, {
        P2002: 'Такой тип работы уже существует',
      });
    }
  }

  async remove(id: string) {
    await this.ensureExists(id);

    try {
      return await this.workTypeDal.delete({ where: { id } });
    } catch (error) {
      throwPrismaError(error, {
        P2003: 'Невозможно удалить тип работы: он используется в журналах работ',
      });
    }
  }

  private async ensureExists(id: string) {
    const workType = await this.workTypeDal.findUnique({ where: { id } });
    if (!workType) {
      throw new NotFoundException('Тип работы не найден');
    }
  }
}
