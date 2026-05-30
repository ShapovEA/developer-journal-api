import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class EmployeeDal {
  constructor(private readonly prisma: PrismaService) {}

  findMany(args?: Prisma.EmployeeFindManyArgs) {
    return this.prisma.employee.findMany(args);
  }

  findUnique(args: Prisma.EmployeeFindUniqueArgs) {
    return this.prisma.employee.findUnique(args);
  }

  findFirst(args: Prisma.EmployeeFindFirstArgs) {
    return this.prisma.employee.findFirst(args);
  }

  create(args: Prisma.EmployeeCreateArgs) {
    return this.prisma.employee.create(args);
  }

  update(args: Prisma.EmployeeUpdateArgs) {
    return this.prisma.employee.update(args);
  }

  delete(args: Prisma.EmployeeDeleteArgs) {
    return this.prisma.employee.delete(args);
  }

  count(args?: Prisma.EmployeeCountArgs) {
    return this.prisma.employee.count(args);
  }
}
