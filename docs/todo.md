# Todo

- [ ] fix all tests
- [ ] add `million.js`. it solves better reconciliation (diffing vnode), while React Forget solves auto memoization (ex: `useMemo`, `useCallback`, `memo`). When I try to use automatic mode in `v2.6.0-beta.16`, my tests breaks because it renders `<slots />` replacing some of optimized components.
