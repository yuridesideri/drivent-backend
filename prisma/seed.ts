import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';
import { TicketType } from '@prisma/client';
import { Prisma } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  let event = await prisma.event.findFirst();
  let ticketType : TicketType[] | Prisma.BatchPayload  = await prisma.ticketType.findMany();

  if (!event) {
    event = await prisma.event.create({
      data: {
        title: 'Driven.t',
        logoImageUrl: 'https://files.driveneducation.com.br/images/logo-rounded.png',
        backgroundImageUrl: 'linear-gradient(to right, #FA4098, #FFD77F)',
        startsAt: dayjs().toDate(),
        endsAt: dayjs().add(21, 'days').toDate(),
      },
    });
  }
  if (ticketType.length !== 3) {
    ticketType = await prisma.ticketType.createMany({
      data: [
        { name: 'Online', price: 100, isRemote: true, includesHotel: false },
        { name: 'Presencial', price: 250, isRemote: false, includesHotel: false },
        { name: 'Presencial', price: 600, isRemote: false, includesHotel: true },
      ]
    });
  }

  console.log({ event, ticketType });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
