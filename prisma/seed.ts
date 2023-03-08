import { Hotel, PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';
import { TicketType } from '@prisma/client';
import { Prisma } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  let event = await prisma.event.findFirst();
  let ticketType: TicketType[] | Prisma.BatchPayload = await prisma.ticketType.findMany();
  let hotelsWithRooms: Hotel[] | Prisma.BatchPayload = await prisma.hotel.findMany();

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
      ],
    });
  }
  if (hotelsWithRooms.length !== 3) {
    let hotel1WithRoom = await prisma.hotel.create({
      data: {
        name: 'Driven Resort',
        image: 'https://pix10.agoda.net/hotelImages/124/1246280/1246280_16061017110043391702.jpg?ca=6&ce=1&s=1024x768',
        Rooms: {
          createMany: {
            data: [
              { name: '101', capacity: 3 },
              { name: '102', capacity: 3 },
            ],
          },
        },
      },
      
    });
    let hotel2WithRoom = await prisma.hotel.create({
      data: {
        name: 'Driven Resort',
        image: 'https://thumbs.dreamstime.com/b/hotel-sign-16711677.jpg',
        Rooms: {
          createMany: {
            data: [
              { name: '103', capacity: 1 },
              { name: '104', capacity: 2 },
            ],
          },
        },
      },
      
    });
    let hotel3WithRoom = await prisma.hotel.create({
      data: {
        name: 'Driven Resort',
        image: 'https://assets.hyatt.com/content/dam/hyatt/hyattdam/images/2022/04/12/1329/MUMGH-P0765-Inner-Courtyard-Hotel-Exterior-Evening.jpg/MUMGH-P0765-Inner-Courtyard-Hotel-Exterior-Evening.16x9.jpg',
        Rooms: {
          createMany: {
            data: [
              { name: '105', capacity: 3 },
              { name: '106', capacity: 2 },
              { name: '107', capacity: 1},
            ],
          },
        },
      },
      
    });

    hotelsWithRooms = [hotel1WithRoom, hotel2WithRoom, hotel3WithRoom];
  }

  console.log({ event, ticketType, hotelsWithRooms });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
