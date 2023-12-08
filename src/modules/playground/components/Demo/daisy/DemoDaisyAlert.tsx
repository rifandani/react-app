import { Icon } from "@iconify/react";

export default function DemoDaisyAlert() {
  return (
    <div className="alert shadow-lg">
      <Icon icon="lucide:info" className="text-primary" />

      <div>
        <h3 className="font-bold">New message!</h3>
        <div className="text-xs">You have 1 unread message</div>
      </div>

      <button type="button" className="btn btn-sm">
        See
      </button>
    </div>
  );
}
