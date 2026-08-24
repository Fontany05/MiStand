import { faker } from '@faker-js/faker';

export const createMockEntrepreneur = () => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  email: faker.internet.email(),
  standName: faker.company.name(),
  description: null,
  currentLocation: null,
  phone: faker.phone.number(),
  createdAt: new Date(),
});
