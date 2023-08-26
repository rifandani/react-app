import { storeResetFns } from '@mocks/zustand.mock';
import '@testing-library/jest-dom'; // automatically `expect.extend(matchers)`
import { act } from '@testing-library/react';
import { server } from 'mocks/http/server.http';
import 'mocks/module.mock';
import 'whatwg-fetch'; // polyfill fetch

// Establish API mocking before all tests with MSW
beforeAll(() => {
  server.listen({
    onUnhandledRequest: 'warn',
  });
});

// Reset any request handlers that we may add during the tests, so they don't affect other tests.
afterEach(() => {
  act(() => {
    storeResetFns.forEach((resetFn) => {
      resetFn();
    });
  });
  server.resetHandlers();
  // vi.resetAllMocks();
  // vi.restoreAllMocks();
  // vi.clearAllMocks();
});

// Clean up after the tests are finished.
afterAll(() => {
  server.close();
});
