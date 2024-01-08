import react from "@assets/images/reactjs.svg";

export default function DemoDaisyAvatar() {
  return (
    <section className="flex items-center space-x-3">
      <div className="avatar offline">
        <div className="w-20 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
          <img src={react} alt="photos" />
        </div>
      </div>
      <div className="avatar placeholder online">
        <div className="bg-neutral-focus w-16 rounded-full text-neutral-content">
          <span className="text-xl">JO</span>
        </div>
      </div>
      <div className="avatar placeholder">
        <div className="bg-neutral-focus mask mask-diamond w-12 text-neutral-content">
          <span>MX</span>
        </div>
      </div>

      <div className="avatar-group -space-x-6">
        <div className="avatar">
          <div className="w-12">
            <img src={react} alt="photos" />
          </div>
        </div>
        <div className="avatar">
          <div className="w-12">
            <img src={react} alt="photos" />
          </div>
        </div>
        <div className="avatar placeholder">
          <div className="bg-neutral-focus w-12 text-neutral-content">
            <span>+99</span>
          </div>
        </div>
      </div>
    </section>
  );
}
