import { prisma } from '../src/app';
import { encryptPassword } from '../src/auth-utils';

// const { prisma } = require('../src/app');
// const { encryptPassword } = require('../src/auth-utils');


const clearDb = async () => {
  await prisma.user.deleteMany();
  await prisma.console.deleteMany();
  await prisma.cheatCode.deleteMany();
};

const seed = async () => {
  console.log('Seeding the database...');
  await clearDb();

  //| Seed Users
  const zak = await prisma.user.create({
    data: {
      username: 'Zak',
      passwordHash: await encryptPassword('password'),
    },
  });

  const jon = await prisma.user.create({
    data: {
      username: 'coder',
      passwordHash: await encryptPassword('password'),
    },
  });

  const marty = await prisma.user.create({
    data: {
      username: 'Jon',
      passwordHash: await encryptPassword('password'),
    },
  });

  //| Seed Consoles
  const XboxOne = await prisma.console.create({
    data: {
      console: 'XboxOne',
    },
  });

  const PS5 = await prisma.console.create({
    data: {
      console: 'PS5',
    },
  });

  const PC = await prisma.console.create({
    data: {
      console: 'PC',
    },
  });

  const Switch = await prisma.console.create({
    data: {
      console: 'Switch',
    },
  });

  //| Seed Cheat Codes

  const RDR2 = await prisma.cheatCode.create({
    data: {
      gameTitle: 'Red Dead II',
      codeTitle: 'max stamina',
      code: 'A-A-A-B-B-L1-L2-R1-RB',
      // gameConsole: 'Xbox One',
      userId: 1,
      consoleId: 1
    },
  });

  const GTA5 = await prisma.cheatCode.create({
    data: {
      gameTitle: 'GTA5',
      codeTitle: 'max stamina',
      code: 'A-A-A-B-B-L1-L2-R1-RB',
      // gameConsole: 'XboxOne',
      userId: 1,
      consoleId: 1

    },
  });

  const Sims4 = await prisma.cheatCode.create({
    data: {
      gameTitle: 'Sims4',
      codeTitle: 'more money',
      code: 'rosebud',
      // gameConsole: 'PC',
      userId: 1,
      consoleId: 3
    },
  });

};

seed()
.then(async () => {
  await prisma.$disconnect()
})
.catch(async (e) => {
  console.error(e)
  await prisma.$disconnect()
  process.exit(1)
})
