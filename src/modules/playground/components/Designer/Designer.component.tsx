import { For } from '@shared/components/atoms';
import { modes, themes } from '@shared/constants/theme.constant';
import { useColorMode } from '@shared/hooks/useColorMode/useColorMode.hook';
import {
  Button,
  Input,
  Label,
  Switch,
  Text,
  TextArea,
  TextField,
} from 'react-aria-components';

export default function Designer() {
  const [, setTheme] = useColorMode({
    modes,
    attribute: 'data-theme',
  });

  return (
    <>
      <aside className="flex w-1/5 flex-col rounded-tr-lg bg-base-300 p-4">
        <h1
          data-testid="title"
          className="text-2xl font-semibold tracking-wider"
        >
          Designer
        </h1>

        <ul className="menu w-full max-w-xs  p-0 pt-4">
          <li>
            <details open>
              <summary>Themes</summary>

              <ul className="max-h-80 overflow-y-auto">
                <For each={themes}>
                  {(theme) => (
                    <li key={theme}>
                      <Button
                        type="button"
                        className="btn btn-sm justify-start capitalize tracking-wide"
                        aria-label={`theme-${theme}`}
                        onPress={() => {
                          setTheme(theme);
                        }}
                      >
                        {theme}
                      </Button>
                    </li>
                  )}
                </For>
              </ul>
            </details>
          </li>
        </ul>
      </aside>

      <aside className="grid w-full grid-cols-2 gap-4 p-4">
        <section className="rounded-lg bg-base-200 p-4">
          <Text className="text-primary">Input</Text>
          <div className="flex space-x-2 py-2">
            <Input
              name="input-text"
              type="text"
              placeholder="Input here"
              className="input max-w-fit"
            />
            <TextArea
              name="input-textarea"
              placeholder="Textarea here"
              className="input input-bordered max-w-fit"
            />
          </div>

          <Text className="text-primary">TextField</Text>
          <div className="flex space-x-2 py-2">
            <TextField className="flex flex-col">
              <Label htmlFor="email" className="label label-text">
                Email
              </Label>
              <Input id="email" name="email" type="email" className="input" />
              <Text slot="description" className="">
                Enter an email for us to contact you.
              </Text>
            </TextField>

            <TextField className="flex flex-col">
              <Label htmlFor="email-error" className="label label-text-alt">
                Email
              </Label>
              <Input
                id="email-error"
                name="email-error"
                type="email-error"
                className="input input-error"
              />
              <Text slot="errorMessage" className="text-error">
                Please enter a valid email address.
              </Text>
            </TextField>
          </div>

          {/* NOTE: Switch component not using semantic HTML, feels weird to style */}
          <Text className="text-primary">Switch</Text>
          <div className="flex space-x-2 py-2">
            <Switch defaultSelected name="switch" className="toggle" />

            <Switch defaultSelected name="switch" className="toggle">
              <Label className="label">Toggle Theme</Label>
            </Switch>
          </div>
        </section>

        <section className="rounded-lg bg-base-200 p-4">
          <Text>Content</Text>
        </section>
      </aside>
    </>
  );
}
