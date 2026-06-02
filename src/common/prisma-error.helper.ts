import { ConflictException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

export type PrismaErrorCode = 'P2002' | 'P2003';

export function throwPrismaError(
  error: unknown,
  messages: Partial<Record<PrismaErrorCode, string>>,
): never {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const message = messages[error.code as PrismaErrorCode];

    if (message) {
      throw new ConflictException(message);
    }
  }

  throw error;
}
