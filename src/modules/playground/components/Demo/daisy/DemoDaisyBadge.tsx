import { Icon } from '@iconify/react';

export default function DemoDaisyBadge() {
  return (
    <section className="flex items-center space-x-3">
      <div className="badge badge-success gap-2">
        <Icon icon="lucide:check-circle" />
        success
      </div>

      <button type="button" className="btn">
        Inbox
        <div className="badge">+99</div>
      </button>
    </section>
  );
}
