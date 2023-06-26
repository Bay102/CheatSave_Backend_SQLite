-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Console" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "consoleName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "CheatCode" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "gameTitle" TEXT NOT NULL,
    "codeTitle" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "consoleName" TEXT NOT NULL,
    CONSTRAINT "CheatCode_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CheatCode_consoleName_fkey" FOREIGN KEY ("consoleName") REFERENCES "Console" ("consoleName") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Console_consoleName_key" ON "Console"("consoleName");
