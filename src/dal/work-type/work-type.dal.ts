import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class WorkTypeDal {
  constructor(private readonly prisma: PrismaService) {}

  findMany(args?: Prisma.WorkTypeFindManyArgs) {
    return this.prisma.workType.findMany(args);
  }

  findUnique(args: Prisma.WorkTypeFindUniqueArgs) {
    return this.prisma.workType.findUnique(args);
  }

  findFirst(args: Prisma.WorkTypeFindFirstArgs) {
    return this.prisma.workType.findFirst(args);
  }

  create(args: Prisma.WorkTypeCreateArgs) {
    return this.prisma.workType.create(args);
  }

  update(args: Prisma.WorkTypeUpdateArgs) {
    return this.prisma.workType.update(args);
  }

  delete(args: Prisma.WorkTypeDeleteArgs) {
    return this.prisma.workType.delete(args);
  }

  count(args?: Prisma.WorkTypeCountArgs) {
    return this.prisma.workType.count(args);
  }
}
