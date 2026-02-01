-- CreateTable
CREATE TABLE "Reservation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "customerName" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "date" DATETIME NOT NULL,
    "time" TEXT NOT NULL,
    "people" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "memo" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
