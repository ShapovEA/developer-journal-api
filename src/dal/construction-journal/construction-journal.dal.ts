import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ConstructionJournalDal {
  constructor(private readonly prisma: PrismaService) {}

  findMany(args: Prisma.ConstructionJournalFindManyArgs) {
    return this.prisma.constructionJournal.findMany(args);
  }

  findUnique(args: Prisma.ConstructionJournalFindUniqueArgs) {
    return this.prisma.constructionJournal.findUnique(args);
  }

  findFirst(args: Prisma.ConstructionJournalFindFirstArgs) {
    return this.prisma.constructionJournal.findFirst(args);
  }

  create(args: Prisma.ConstructionJournalCreateArgs) {
    return this.prisma.constructionJournal.create(args);
  }

  update(args: Prisma.ConstructionJournalUpdateArgs) {
    return this.prisma.constructionJournal.update(args);
  }

  delete(args: Prisma.ConstructionJournalDeleteArgs) {
    return this.prisma.constructionJournal.delete(args);
  }

  count(args?: Prisma.ConstructionJournalCountArgs) {
    return this.prisma.constructionJournal.count(args);
  }
}
