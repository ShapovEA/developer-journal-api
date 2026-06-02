import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ConstructionJournalDal } from '../dal/construction-journal/construction-journal.dal';
import { EmployeeDal } from '../dal/employee/employee.dal';
import { WorkTypeDal } from '../dal/work-type/work-type.dal';
import { CreateConstructionJournalDto } from './dto/create-construction-journal.dto';
import { UpdateConstructionJournalDto } from './dto/update-construction-journal.dto';

type JournalSortField = 'completedAt' | 'createdAt' | 'volume';
type SortOrder = 'asc' | 'desc';

const includeRelations = {
  workType: true,
  employee: true,
} satisfies Prisma.ConstructionJournalInclude;

@Injectable()
export class ConstructionJournalService {
  constructor(
    private readonly journalDal: ConstructionJournalDal,
    private readonly workTypeDal: WorkTypeDal,
    private readonly employeeDal: EmployeeDal,
  ) {}

  findAll(
    completedAtFrom?: string,
    completedAtTo?: string,
    sortBy: JournalSortField = 'completedAt',
    sortOrder: SortOrder = 'desc',
  ) {
    const where: Prisma.ConstructionJournalWhereInput = {};

    if (completedAtFrom || completedAtTo) {
      where.completedAt = {};
      if (completedAtFrom) where.completedAt.gte = new Date(completedAtFrom);
      if (completedAtTo) where.completedAt.lte = new Date(completedAtTo);
    }

    return this.journalDal.findMany({
      where,
      include: includeRelations,
      orderBy: { [sortBy]: sortOrder },
    });
  }

  async create(dto: CreateConstructionJournalDto) {
    await this.ensureRelationsExist(dto.workTypeId, dto.employeeId);
    this.assertVolume(dto.volume);

    return this.journalDal.create({
      data: {
        workTypeId: dto.workTypeId,
        employeeId: dto.employeeId,
        completedAt: new Date(dto.completedAt),
        volume: new Prisma.Decimal(dto.volume),
      },
      include: includeRelations,
    });
  }

  async update(id: string, dto: UpdateConstructionJournalDto) {
    const current = await this.ensureExists(id);
    const workTypeId = dto.workTypeId ?? current.workTypeId;
    const employeeId = dto.employeeId ?? current.employeeId;

    await this.ensureRelationsExist(workTypeId, employeeId);
    if (dto.volume !== undefined) {
      this.assertVolume(dto.volume);
    }

    return this.journalDal.update({
      where: { id },
      data: {
        workTypeId: dto.workTypeId,
        employeeId: dto.employeeId,
        completedAt: dto.completedAt ? new Date(dto.completedAt) : undefined,
        volume:
          dto.volume !== undefined ? new Prisma.Decimal(dto.volume) : undefined,
      },
      include: includeRelations,
    });
  }

  async remove(id: string) {
    await this.ensureExists(id);
    return this.journalDal.delete({ where: { id } });
  }

  private assertVolume(volume: number) {
    if (volume <= 0) {
      throw new BadRequestException('Объем должен быть больше 0');
    }
  }

  private async ensureRelationsExist(workTypeId: string, employeeId: string) {
    const [workType, employee] = await Promise.all([
      this.workTypeDal.findUnique({ where: { id: workTypeId } }),
      this.employeeDal.findUnique({ where: { id: employeeId } }),
    ]);

    if (!workType) throw new NotFoundException('Тип работы не найден');
    if (!employee) throw new NotFoundException('Работник не найден');
  }

  private async ensureExists(id: string) {
    const item = await this.journalDal.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Запись в журнале не найдена');
    return item;
  }
}
