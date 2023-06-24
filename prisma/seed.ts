import { prisma } from '../src/app';
import { encryptPassword } from '../src/auth-utils';

const clearDb = async () => {
  await prisma.user.deleteMany();
  await prisma.console.deleteMany();
  await prisma.cheatCode.deleteMany();
};

const seed = async () => {
console.log('Seeding the database...');
  await clearDb();

//* Seed Users
  const zak = await prisma.user.create({
    data: {
      username: 'jon@jon.com',
      passwordHash: await encryptPassword('jon_password'),
    },
  });

  const jon = await prisma.user.create({
    data: {
      username: 'zak@zak.com',
      passwordHash: await encryptPassword('jon_password'),
    },
  });

  const marty = await prisma.user.create({
   data: {
     username: 'martin@martin.com',
     passwordHash: await encryptPassword('jon_password'),
   },
 });

 //* Seed Consoles 


};

seed()
  .then(() => {
    console.log('Seeding complete');
  })
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
