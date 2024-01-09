import { vi } from 'vitest';
import * as zustand from 'zustand';
import { storeResetFns } from './zustand.mock';

// mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// mock window matchMedia
window.matchMedia = function matchMedia(query) {
  return {
    media: query,
    matches: false,
    onchange: null,
    addListener: vi.fn(), // Deprecated
    removeListener: vi.fn(), // Deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  };
};

// implementation of window.resizeTo for dispatching event
window.resizeTo = function resizeTo(width, height) {
  Object.assign(this, {
    innerWidth: width,
    innerHeight: height,
    outerWidth: width,
    outerHeight: height,
  }).dispatchEvent(new this.Event('resize'));
};

// mock window scrollTo
Object.defineProperty(window, 'scrollTo', {
  writable: true,
  value: () => {},
});

// zustand
vi.mock('zustand', async () => {
  const { create: actualCreate, createStore: actualCreateStore } =
    await vi.importActual<typeof zustand>('zustand');

  // when creating a store, we get its initial state, create a reset function and add it in the set
  const create = (<T>() =>
    (stateCreator: zustand.StateCreator<T>) => {
      const store = actualCreate(stateCreator);
      const initialState = store.getState();
      storeResetFns.add(() => {
        store.setState(initialState, true);
      });
      return store;
    }) as typeof zustand.create;

  // when creating a store, we get its initial state, create a reset function and add it in the set
  const createStore = (<T>(stateCreator: zustand.StateCreator<T>) => {
    const store = actualCreateStore(stateCreator);
    const initialState = store.getState();
    storeResetFns.add(() => {
      store.setState(initialState, true);
    });
    return store;
  }) as typeof zustand.createStore;

  return {
    create,
    createStore,
  };
});
