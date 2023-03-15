import { Hotel, PrismaClient, TicketType, Prisma, Places, Activities } from '@prisma/client';
import dayjs from 'dayjs';
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
        { name: 'Presencial', price: 900, isRemote: false, includesHotel: true },
      ],
    });
  }
  if (hotelsWithRooms.length !== 3) {
    let hotel1WithRoom = await prisma.hotel.create({
      data: {
        name: 'Driven Resort',
        image: 'https://pix10.agoda.net/hotelImages/124/1249280/1249280_19091017110043391702.jpg?ca=9&ce=1&s=1024x798',
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
        name: 'Driven Plazza',
        image: 'https://thumbs.dreamstime.com/b/hotel-sign-19711977.jpg',
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
        name: 'Driven Master Hotel',
        image: 'https://assets.hyatt.com/content/dam/hyatt/hyattdam/images/2022/04/12/1329/MUMGH-P0795-Inner-Courtyard-Hotel-Exterior-Evening.jpg/MUMGH-P0795-Inner-Courtyard-Hotel-Exterior-Evening.19x9.jpg',
        Rooms: {
          createMany: {
            data: [
              { name: '105', capacity: 3 },
              { name: '109', capacity: 2 },
              { name: '107', capacity: 1 },
            ],
          },
        },
      },

    });

    hotelsWithRooms = [hotel1WithRoom, hotel2WithRoom, hotel3WithRoom];
  }

  let places: Places[] | Prisma.BatchPayload = await prisma.places.findMany();

  if (places.length < 3) {
    places = await prisma.places.createMany({
      data: [
        { name: "Auditório Principal" },
        { name: "Auditório Lateral" },
        { name: "Sala de Workshop" },
      ]
    })
  }

  let activities: Activities[] | Prisma.BatchPayload = await prisma.activities.findMany();
  if (activities.length < 4) {
    activities = await prisma.activities.createMany({
      data: [
        {
          title: "Minecraft: montando o PC ideal",
          vacancies: 27,
          startsAt: "9:00",
          endsAt: "10:00",
          day: new Date(2022, 2, 18, 0),
          placeId: 1
        },
        {
          title: "LoL: montando o PC ideal",
          vacancies: 3,
          startsAt: "10:30",
          endsAt: "11:30",
          day: new Date(2022, 2, 18, 0),
          placeId: 1
        },
        {
          title: "Palestra x",
          vacancies: 10,
          startsAt: "9:00",
          endsAt: "11:00",
          day: new Date(2022, 2, 18, 0),
          placeId: 2
        },
        {
          title: "Palestra y",
          vacancies: 8,
          startsAt: "9:30",
          endsAt: "10:30",
          day: new Date(2022, 2, 18, 0),
          placeId: 3
        },
        {
          title: "Palestra z",
          vacancies: 3,
          startsAt: "10:00",
          endsAt: "10:00",
          day: new Date(2022, 2, 18, 0),
          placeId: 3
        },
        {
          title: "Minecraft: montando o PC ideal",
          vacancies: 27,
          startsAt: "9:00",
          endsAt: "10:00",
          day: new Date(2022, 2, 19, 0),
          placeId: 1
        },
        {
          title: "LoL: montando o PC ideal",
          vacancies: 3,
          startsAt: "10:00",
          endsAt: "11:00",
          day: new Date(2022, 2, 19, 0),
          placeId: 1
        },
        {
          title: "Palestra x",
          vacancies: 10,
          startsAt: "9:00",
          endsAt: "11:00",
          day: new Date(2022, 2, 19, 0),
          placeId: 2
        },
        {
          title: "Minecraft: montando o PC ideal",
          vacancies: 27,
          startsAt: "9:00",
          endsAt: "10:00",
          day: new Date(2022, 2, 20, 0),
          placeId: 1
        },
        {
          title: "LoL: montando o PC ideal",
          vacancies: 3,
          startsAt: "10:00",
          endsAt: "11:00",
          day: new Date(2022, 2, 20, 0),
          placeId: 1
        },
        {
          title: "Palestra x",
          vacancies: 10,
          startsAt: "9:00",
          endsAt: "11:00",
          day: new Date(2022, 2, 20, 0),
          placeId: 2
        },
      ]
    });
  }

  console.log({ event, ticketType, hotelsWithRooms, places, activities });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
