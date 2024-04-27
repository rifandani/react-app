# Issues

## Issues/improvements I personally encounter when using JollyUI:

- `date-picker` -> use `@internationalized/date` instead of `date-fns` to format date
- `checkbox` -> `labelVariants` function should be called inside of `cn` -> `labelVariants()`
- `radio-group` -> `labelVariants` function should be called inside of `cn` -> `labelVariants()`
- `searchfield` -> All className should be `(values) => typeof className === 'function' ? className(values) : className`
- `switch` -> `<div className="pointer-events-none block h-5 w-5"` there's no need for `cn` helper.
- `breadcrumbs` -> in `BreadcrumbLink` and `BreadcrumbPage`, className should be `(values) => typeof className === 'function' ? className(values) : className`.
- `Link` we don't need `LinkRenderProps` assertions in className values, it's already inferred
- `tabs` -> `Selected items not found. Exiting.` error. All className should be `(values) => typeof className === 'function' ? className(values) : className`
- `dialog` -> in `DialogContent`, `Modal` className should be `(values) => typeof className === 'function' ? className(values) : className`
- `TextArea` className should be `(values) => typeof className === 'function' ? className(values) : className`