import { act } from '@testing-library/react'
import { server } from '#mocks/http/server.http'
import { storeResetFns } from '#mocks/zustand.mock'
import { queryClientTest } from '#shared/utils/test.util'

import '@testing-library/jest-dom/vitest'
import './mocks/module.mock'

// Establish API mocking before all tests with MSW
beforeAll(() => {
  server.listen({
    onUnhandledRequest: 'warn',
  })
})

beforeEach(() => {
  // Reset the cache before each new test so there are no stale responses when requesting same endpoints.
  queryClientTest.clear()
})

// Reset any request handlers that we may add during the tests, so they don't affect other tests.
afterEach(() => {
  act(() => {
    storeResetFns.forEach((resetFn) => {
      resetFn()
    })
  })
  server.resetHandlers()
  // vi.resetAllMocks();
  // vi.restoreAllMocks();
  // vi.clearAllMocks();
})

// Clean up after the tests are finished.
afterAll(() => {
  server.close()
})
