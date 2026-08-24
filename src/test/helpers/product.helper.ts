import { faker } from '@faker-js/faker';

export const createMockProduct = (entrepreneurId?: string) => ({
  id: faker.string.uuid(),
  name: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  price: parseFloat(faker.commerce.price()),
  photo: faker.image.url(),
  available: true,
  entrepreneurId: entrepreneurId ?? faker.string.uuid(),
  createdAt: new Date(),
});
