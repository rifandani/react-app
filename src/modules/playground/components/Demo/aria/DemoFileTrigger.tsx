import { useState } from 'react';
import { usePress } from 'react-aria';
import { FileTrigger } from 'react-aria-components';

function Pressable() {
  const [, setEvents] = useState<string[]>([]);
  const { pressProps, isPressed } = usePress({
    onPressStart: (e) => {
      setEvents((prev) => [...prev, `press start with ${e.pointerType}`]);
    },
    onPressEnd: (e) => {
      setEvents((prev) => [...prev, `press end with ${e.pointerType}`]);
    },
    onPress: (e) => {
      setEvents((prev) => [...prev, `press with ${e.pointerType}`]);
    },
  });

  return (
    <>
      <div
        {...pressProps}
        style={{
          background: isPressed ? 'darkgreen' : 'green',
          color: 'white',
          display: 'inline-block',
          padding: 4,
          cursor: 'pointer',
        }}
        role="button"
        tabIndex={0}
      >
        Pressable
      </div>

      {/*
      <ul
        style={{
          maxHeight: '200px',
          overflow: 'auto',
        }}
      >
        {events.map((evt) => (
          <li key={evt}>{evt}</li>
        ))}
      </ul> */}
    </>
  );
}

/**
 * still not working
 */
export default function DemoFileTrigger() {
  // const [file, setFile] = useState(null);

  return (
    <section className="flex flex-wrap items-center gap-3">
      <FileTrigger
        allowsMultiple
        onChange={(fileList) => {
          console.log(
            '🚀 ~ file: DemoAriaFileTrigger.tsx:13 ~ DemoAriaFileTrigger ~ fileList:',
            fileList,
          );
        }}
      >
        <Pressable />
      </FileTrigger>
      {/* <Button className="">Select images</Button> */}
    </section>
  );
}
