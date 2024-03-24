import { Button } from '#shared/components/ui/button';
import { useState } from 'react';
import { FileTrigger, Group } from 'react-aria-components';

export function DemoFileTrigger() {
  const [file, setFile] = useState<string[] | null>(null);

  return (
    <section className="flex flex-col flex-wrap gap-3 rounded-md border p-3">
      <div className="flex gap-x-3">File Trigger</div>

      <FileTrigger
        allowsMultiple
        onSelect={(fileList) => {
          if (!fileList) return;

          const files = Array.from(fileList);
          const urls = files.map((_file) => _file.name);
          setFile(urls);
        }}
      >
        <Group className="flex items-center gap-x-3">
          <Button variant="default">Choose File</Button>
          <span className="">Select images</span>
        </Group>
      </FileTrigger>

      {file && (
        <Group className="flex items-center gap-x-3">
          {file.map((val) => (
            <p key={val}>{val}</p>
          ))}
        </Group>
      )}
    </section>
  );
}
