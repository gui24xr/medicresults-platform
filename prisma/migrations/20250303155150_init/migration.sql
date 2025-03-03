-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'DEV',
    "relatedId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Medic" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "medicRecord" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "whatsApp" TEXT,
    "email" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Patient" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dni" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "patientRecord" TEXT,
    "healthCare" TEXT,
    "whatsApp" TEXT,
    "email" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Study" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME,
    "medicId" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "diagnosticText" TEXT,
    "accessCode" TEXT,
    "pdfUrl" TEXT,
    "expirationDate" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Study_medicId_fkey" FOREIGN KEY ("medicId") REFERENCES "Medic" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Study_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ImagesURL" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "studyId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ImagesURL_studyId_fkey" FOREIGN KEY ("studyId") REFERENCES "Study" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Medic_medicRecord_key" ON "Medic"("medicRecord");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_dni_key" ON "Patient"("dni");
