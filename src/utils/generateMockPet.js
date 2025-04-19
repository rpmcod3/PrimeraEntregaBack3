import { faker } from '@faker-js/faker';

export const generateMockPet = () => {
  return {
    _id: faker.database.mongodbObjectId(),
    name: faker.person.firstName(),
    specie: faker.animal.type(),
    breed: faker.animal.dog(),
    age: faker.number.int({ min: 1, max: 15 }),
    adopted: false,
    owner: null,
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  };
};
