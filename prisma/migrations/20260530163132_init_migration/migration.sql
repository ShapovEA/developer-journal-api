-- CreateEnum
CREATE TYPE "MeasurementUnit" AS ENUM ('M', 'SQM', 'CBM', 'PCS');

-- CreateTable
CREATE TABLE "ConstructionJournal" (
    "id" UUID NOT NULL,
    "workTypeId" UUID NOT NULL,
    "completedAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "volume" DECIMAL(12,2) NOT NULL,
    "employeeId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ConstructionJournal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkType" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "unit" "MeasurementUnit" NOT NULL,

    CONSTRAINT "WorkType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employee" (
    "id" UUID NOT NULL,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT,
    "lastName" TEXT NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ConstructionJournal_completedAt_idx" ON "ConstructionJournal"("completedAt");

-- CreateIndex
CREATE UNIQUE INDEX "WorkType_name_key" ON "WorkType"("name");

-- AddForeignKey
ALTER TABLE "ConstructionJournal" ADD CONSTRAINT "ConstructionJournal_workTypeId_fkey" FOREIGN KEY ("workTypeId") REFERENCES "WorkType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConstructionJournal" ADD CONSTRAINT "ConstructionJournal_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
