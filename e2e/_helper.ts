import type { AuthLoginResponseSchema } from '#auth/apis/auth.api';
import type { UserStoreState } from '#auth/hooks/use-auth-user-store.hook';
import { faker } from '@faker-js/faker';

export function seedUser(): AuthLoginResponseSchema {
  return {
    id: faker.number.int(),
    username: faker.person.middleName(),
    email: faker.internet.email(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    gender: faker.helpers.arrayElement(['male', 'female']),
    image: faker.image.avatar(),
    token: faker.string.uuid(),
  };
}

export function getLocalStorageUser(): {
  version: number;
  state: UserStoreState;
} | null {
  if (!localStorage) throw new Error('You are not in the browser env!');

  return JSON.parse(localStorage.getItem('app-user') ?? 'null');
}

export function setLocalStorageUser(user: AuthLoginResponseSchema) {
  if (!localStorage) throw new Error('You are not in the browser env!');

  localStorage.setItem('app-user', JSON.stringify(user));
}
