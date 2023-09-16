import Designer from '@playground/components/Designer/Designer.component';
import { Tab, TabList, TabPanel, Tabs } from 'react-aria-components';
import { twJoin } from 'tailwind-merge';

export default function Playground() {
  return (
    <main className="flex min-h-screen w-full">
      <Tabs defaultSelectedKey="designer" className="w-full">
        <TabList
          aria-label="Playground"
          className="tabs-boxed tabs mx-auto my-5 flex w-fit justify-center"
        >
          <Tab
            id="designer"
            className={({ isSelected, isDisabled }) =>
              twJoin(
                'tab',
                isSelected && 'tab-active',
                isDisabled && 'tab-disabled',
              )
            }
          >
            Designer
          </Tab>

          <Tab
            id="playground"
            className={({ isSelected, isDisabled }) =>
              twJoin(
                'tab',
                isSelected && 'tab-active',
                isDisabled && 'tab-disabled',
              )
            }
          >
            Playground
          </Tab>
        </TabList>

        <TabPanel id="designer" className="flex h-full w-full">
          <Designer />
        </TabPanel>

        <TabPanel id="playground" className="h-full w-full">
          Playground
        </TabPanel>
      </Tabs>
    </main>
  );
}
