import { useState } from 'react';
import { Button, FileTrigger } from 'react-aria-components';

function DaisyFileInput() {
  return (
    <div className="form-control w-full max-w-xs">
      <label className="label">
        <span className="label-text">Pick a file</span>
        <span className="label-text-alt">Alt label</span>
      </label>
      <input
        type="file"
        className="file-input file-input-bordered w-full max-w-xs"
      />

      <label className="label">
        <span className="label-text-alt">Alt label</span>
        <span className="label-text-alt">Alt label</span>
      </label>
    </div>
  );
}

export function DemoFileTrigger() {
  const [file, setFile] = useState<string[] | null>(null);

  return (
    <section className="flex flex-wrap items-center gap-3 rounded border p-3">
      {file?.map((val) => (
        <p key={val}>{val}</p>
      ))}

      <FileTrigger
        allowsMultiple
        onSelect={(fileList) => {
          if (!fileList) return;

          const files = Array.from(fileList);
          const urls = files.map((_file) => _file.name);
          setFile(urls);
        }}
      >
        <div className="join">
          <Button className="btn join-item">Choose File</Button>
          <span className="join-item flex items-center border px-3">
            Select images
          </span>
        </div>
      </FileTrigger>

      <DaisyFileInput />
    </section>
  );
}
