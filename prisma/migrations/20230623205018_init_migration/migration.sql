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
CREATE TABLE "CheatCode" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "gameTitle" TEXT NOT NULL,
    "codeTitle" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "consoleId" INTEGER NOT NULL,
    CONSTRAINT "CheatCode_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CheatCode_consoleId_fkey" FOREIGN KEY ("consoleId") REFERENCES "Console" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_ConsoleToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_ConsoleToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Console" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ConsoleToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Console_console_key" ON "Console"("console");

-- CreateIndex
CREATE UNIQUE INDEX "_ConsoleToUser_AB_unique" ON "_ConsoleToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ConsoleToUser_B_index" ON "_ConsoleToUser"("B");
