import { useState } from 'react';
import { Breadcrumb, Breadcrumbs, Link } from 'react-aria-components';

export function DemoBreadcrumbs() {
  const [breadcrumbs, setBreadcrumbs] = useState([
    { id: 1, label: 'Home' },
    { id: 2, label: 'Trendy' },
    { id: 3, label: 'March 2022 Assets' },
  ]);

  const navigate = (id: React.Key) => {
    const idx = breadcrumbs.findIndex((item) => item.id === id);
    setBreadcrumbs(breadcrumbs.slice(0, idx + 1));
  };

  return (
    <section className="flex flex-wrap items-center gap-3 rounded border p-3">
      <div className="breadcrumbs">
        <Breadcrumbs
          className="flex items-center"
          items={breadcrumbs}
          onAction={navigate}
        >
          {(item) => (
            <Breadcrumb className="flex items-center gap-1 [&>svg]:last-of-type:hidden">
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <Link>{item.label}</Link>
              {/* <Icon icon="lucide:chevron-right" /> */}
            </Breadcrumb>
          )}
        </Breadcrumbs>
      </div>
    </section>
  );
}
