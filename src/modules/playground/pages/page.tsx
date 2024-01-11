import type { ComponentPropsWithoutRef } from 'react'
import { Button, Tab, TabList, TabPanel, Tabs } from 'react-aria-components'
import { twJoin } from 'tailwind-merge'
import { For } from '#shared/components/for/for'
import { modes, themes } from '#shared/constants/theme.constant'
import { useColorMode } from '#shared/hooks/use-color-mode.hook'
import { DemoContainer } from '#playground/components/demo'

export function PlaygroundPage() {
  const [, setTheme] = useColorMode({
    modes,
    attribute: 'data-theme',
  })

  const tabClassName: ComponentPropsWithoutRef<typeof Tab>['className'] = ({
    isSelected,
    isDisabled,
  }) => twJoin('tab', isSelected && 'tab-active', isDisabled && 'tab-disabled')

  return (
    <main className="flex min-h-screen w-full flex-col">
      <ul className="menu mx-auto w-full max-w-xs p-0 pr-4 pt-4">
        <li>
          <details>
            <summary>Themes</summary>

            <ul className="max-h-80 overflow-y-auto">
              <For each={themes}>
                {theme => (
                  <li key={theme}>
                    <Button
                      type="button"
                      className="btn btn-sm justify-start capitalize tracking-wide"
                      onPress={() => {
                        setTheme(theme)
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

      <Tabs defaultSelectedKey="designer" className="w-full">
        <TabList
          aria-label="Playground"
          className="tabs-boxed tabs mx-auto my-5 flex w-fit justify-center"
        >
          <Tab id="demo" className={tabClassName}>
            Demo
          </Tab>

          <Tab id="playground" className={tabClassName}>
            Playground
          </Tab>
        </TabList>

        <TabPanel id="demo" className="h-full w-full">
          <DemoContainer />
        </TabPanel>

        <TabPanel id="playground" className="h-full w-full">
          Playground
        </TabPanel>
      </Tabs>
    </main>
  )
}