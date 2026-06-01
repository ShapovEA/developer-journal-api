import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
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

  create(dto: CreateWorkTypeDto) {
    return this.handleUniqueName(() =>
      this.workTypeDal.create({
        data: {
          name: dto.name.trim(),
          unit: dto.unit,
        },
      }),
    );
  }

  async update(id: string, dto: UpdateWorkTypeDto) {
    await this.ensureExists(id);

    return this.handleUniqueName(() =>
      this.workTypeDal.update({
        where: { id },
        data: {
          name: dto.name?.trim(),
          unit: dto.unit,
        },
      }),
    );
  }

  async remove(id: string) {
    await this.ensureExists(id);

    try {
      return await this.workTypeDal.delete({ where: { id } });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2003'
      ) {
        throw new ConflictException(
          'Невозможно удалить: вид работ используется в журнале',
        );
      }
      throw error;
    }
  }

  private async ensureExists(id: string) {
    const workType = await this.workTypeDal.findUnique({ where: { id } });
    if (!workType) {
      throw new NotFoundException('Вид работ не найден');
    }
  }

  private async handleUniqueName<T>(action: () => Promise<T>): Promise<T> {
    try {
      return await action();
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Вид работ с таким названием уже существует');
      }
      throw error;
    }
  }
}
