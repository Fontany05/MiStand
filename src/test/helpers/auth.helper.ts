import { faker } from '@faker-js/faker';

export const createRegisterDto = () => ({
  name: faker.person.fullName(),
  email: faker.internet.email(),
  password: faker.internet.password({ length: 8 }),
  standName: faker.company.name(),
  phone: faker.phone.number(),
});
