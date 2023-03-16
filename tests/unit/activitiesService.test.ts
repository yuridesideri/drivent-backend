import activitiesService from "@/services/activities-service";
import enrollmentRepository from "@/repositories/enrollment-repository";
import userRepository from "@/repositories/user-repository";
import ticketRepository from "@/repositories/ticket-repository";

describe("test of functions services of activities", () => {
  it("should return undefined when it has no activities", async () => {
    const user = {
      id: 1,
      email: "Jordyn_Braun9@yahoo.com",
      password: "$2b$10$RpY8gKKg8tHoPSBRGn7CWODzz4.Hyu5UJprnKQ4Jf6Fj6y464V5M.",
      createdAt: "2023-03-16 00:11:33.625",
      updatedAt: "2023-03-16 00:11:33.625"
    };

    jest.spyOn(userRepository, "create").mockImplementationOnce((): any => {
      return {
        id: 1,
        email: user.email,
        password: user.password,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
    });

    jest.spyOn(enrollmentRepository, "findWithAddressByUserId").mockImplementationOnce((): any => {
      return {
        name: "Sara Rocha",
        cpf: "18547235701",
        birthday: "2023-01-19T10:04:53.096Z",
        phone: "(21) 98999-9999",
        address: {
          cep: "29830-000",
          street: "bbbb",
          neighborhood: "aaaaa",
          addressDetail: "aaaaa",
          number: "10",
          city: "São Paulo",
          state: "SP"
        }
      };
    });

    jest.spyOn(ticketRepository, "findTicketByEnrollmentId").mockImplementationOnce((): any => {
      return {
        id: user.id,
        ticketTypeId: 196,
        enrollmentId: 192,
        status: "PAID",
        createdAt: "2023-03-16T00:37:41.249Z",
        updatedAt: "2023-03-16T00:37:41.249Z",
        TicketType: {
          id: 196,
          name: "Irene Jaskolski",
          price: 84741,
          isRemote: false,
          includesHotel: true,
          createdAt: "2023-03-16T00:11:33.631Z",
          updatedAt: "2023-03-16T00:11:33.631Z"
        }
      };
    });

    const promisse = await  activitiesService.listActivities(user.id);
    expect(promisse).toBe(undefined);
  });
});
