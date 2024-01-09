export function DaisyRadio() {
  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label className="label cursor-pointer gap-3">
      <span className="label-text">DaisyUI</span>
      <input
        name="daisy-radio"
        type="radio"
        className="radio checked:bg-success"
      />
    </label>
  );
}
