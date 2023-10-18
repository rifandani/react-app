export default function DaisySwitch() {
  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label className="label cursor-pointer gap-3">
      <span className="label-text">DaisyUI</span>
      <input
        name="daisy-switch"
        type="checkbox"
        className="toggle toggle-primary"
      />
    </label>
  );
}
