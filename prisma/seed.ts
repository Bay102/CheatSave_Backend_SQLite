import { prisma } from '../src/app';
import { encryptPassword } from '../src/auth-utils';

const clearDb = async () => {
  await prisma.cheatCode.deleteMany();
  await prisma.user.deleteMany();
  await prisma.console.deleteMany();
};

const seed = async () => {
  console.log('Seeding the database...');
  await clearDb();

  //| Seed Users
  const zak = await prisma.user.create({
    data: {
      id: 1,
      username: 'doomslayer',
      passwordHash: await encryptPassword('password'),
    },
  });

  const jon = await prisma.user.create({
    data: {
      id: 2,
      username: 'coder',
      passwordHash: await encryptPassword('password'),
    },
  });

  const marty = await prisma.user.create({
    data: {
      id: 3,
      username: 'Jon',
      passwordHash: await encryptPassword('password'),
    },
  });

  //| Seed Consoles
  const XboxOne = await prisma.console.create({
    data: {
      id: 1,
      consoleName: 'XboxOne',
    },
  });

  const PS5 = await prisma.console.create({
    data: {
      id: 2,
      consoleName: 'PS5',
    },
  });

  const PC = await prisma.console.create({
    data: {
      id: 3,
      consoleName: 'PC',
    },
  });

  const Switch = await prisma.console.create({
    data: {
      id: 4,
      consoleName: 'Switch',
    },
  });

  //| Seed Cheat Codes
  const seedGame = await prisma.cheatCode.create({
    data: {
      id: 1,
      gameTitle: 'Red Dead II',
      codeTitle: 'max stamina',
      code: 'A-A-A-B-B-L1-L2-R1-RB',
      userId: 1,
      consoleName: 'XboxOne',
    },
  });

  const RDR2 = await prisma.cheatCode.create({
    data: {
      id: 2,
      gameTitle: 'Red Dead II',
      codeTitle: 'max stamina',
      code: 'A-A-A-B-B-L1-L2-R1-RB',
      userId: 1,
      consoleName: 'XboxOne',
    },
  });

  const GTA5 = await prisma.cheatCode.create({
    data: {
      id: 3,
      gameTitle: 'GTA5',
      codeTitle: 'max stamina',
      code: 'A-A-A-B-B-L1-L2-R1-RB',
      userId: 1,
      consoleName: 'PC',
    },
  });

  const Sims4 = await prisma.cheatCode.create({
    data: {
      id: 4,
      gameTitle: 'Sims4',
      codeTitle: 'more money',
      code: 'rosebud',
      userId: 1,
      consoleName: 'PS5',
    },
  });

  const sims4 = await prisma.cheatCode.create({
    data: {
      id: 5,
      gameTitle: 'Sims4',
      codeTitle: 'more money',
      code: 'rosebud',
      userId: 2,
      consoleName: 'XboxOne',
    },
  });

  const gta5 = await prisma.cheatCode.create({
    data: {
      id: 6,
      gameTitle: 'GTA5',
      codeTitle: 'max stamina',
      code: 'A-A-A-B-B-L1-L2-R1-RB',
      userId: 3,
      consoleName: 'Switch',
    },
  });

  const seeedGame1 = await prisma.cheatCode.create({
    data: {
      id: 7,
      gameTitle: 'GTA 4',
      codeTitle: 'Weapons',
      code: 'R1-B-B-Y-A-L1-L2-R1-X',
      userId: 1,
      consoleName: 'PS5',
    },
  });

  const seeedGame2 = await prisma.cheatCode.create({
    data: {
      id: 8,
      gameTitle: 'GTA 4',
      codeTitle: 'Spawn Sanchez',
      code: 'R1-B-B-X-A-Y-Y-R1-X',
      userId: 1,
      consoleName: 'PS5',
    },
  });

  const seeedGame3 = await prisma.cheatCode.create({
    data: {
      id: 9,
      gameTitle: 'SpiderMan',
      codeTitle: 'Infinite Stamina',
      code: 'R1-B-B-Y-A-L1-L2-R1-X',
      userId: 1,
      consoleName: 'XboxOne',
    },
  });
};

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
