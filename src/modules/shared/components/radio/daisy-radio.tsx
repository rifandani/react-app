export function DaisyRadio() {
  return (
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
