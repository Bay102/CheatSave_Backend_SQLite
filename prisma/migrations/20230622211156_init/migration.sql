-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Console" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "console" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "User_CheatCode" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "gameTitle" TEXT NOT NULL,
    "codeTitle" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "consoleId" INTEGER NOT NULL,
    CONSTRAINT "User_CheatCode_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "User_CheatCode_consoleId_fkey" FOREIGN KEY ("consoleId") REFERENCES "Console" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Console_console_key" ON "Console"("console");
