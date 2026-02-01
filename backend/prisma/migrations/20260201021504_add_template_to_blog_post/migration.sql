-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_BlogPost" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "tags" TEXT NOT NULL,
    "template" INTEGER NOT NULL DEFAULT 1,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "views" INTEGER NOT NULL DEFAULT 0,
    "thumbnail" TEXT,
    "author" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_BlogPost" ("author", "category", "content", "createdAt", "date", "excerpt", "id", "tags", "thumbnail", "title", "updatedAt", "views") SELECT "author", "category", "content", "createdAt", "date", "excerpt", "id", "tags", "thumbnail", "title", "updatedAt", "views" FROM "BlogPost";
DROP TABLE "BlogPost";
ALTER TABLE "new_BlogPost" RENAME TO "BlogPost";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
