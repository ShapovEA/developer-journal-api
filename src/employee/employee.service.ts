import { Injectable, NotFoundException } from '@nestjs/common';
import { throwPrismaError } from '../common/prisma-error.helper';
import { EmployeeDal } from '../dal/employee/employee.dal';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeeService {
  constructor(private readonly employeeDal: EmployeeDal) {}

  findAll() {
    return this.employeeDal.findMany({
      orderBy: [{ lastName: 'asc' }, { firstName: 'asc' }],
    });
  }

  async create(dto: CreateEmployeeDto) {
    return this.employeeDal.create({
      data: {
        firstName: dto.firstName.trim(),
        middleName: dto.middleName?.trim() || null,
        lastName: dto.lastName.trim(),
      },
    });
  }

  async update(id: string, dto: UpdateEmployeeDto) {
    await this.ensureExists(id);

    return this.employeeDal.update({
      where: { id },
      data: {
        firstName: dto.firstName?.trim(),
        middleName:
          dto.middleName === undefined ? undefined : dto.middleName?.trim() || null,
        lastName: dto.lastName?.trim(),
      },
    });
  }

  async remove(id: string) {
    await this.ensureExists(id);

    try {
      return await this.employeeDal.delete({ where: { id } });
    } catch (error) {
      throwPrismaError(error, {
        P2003: 'Невозможно удалить работника: он используется в журналах работ',
      });
    }
  }

  private async ensureExists(id: string) {
    const employee = await this.employeeDal.findUnique({ where: { id } });
    if (!employee) {
      throw new NotFoundException('Работник не найден');
    }
  }
}
