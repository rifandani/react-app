import React from 'react';
import {
  Button,
  Collection,
  Tab,
  TabList,
  TabPanel,
  Tabs,
} from 'react-aria-components';
import { twJoin } from 'tailwind-merge';

export default function DemoTabs() {
  const [tabs, setTabs] = React.useState([
    { id: 1, title: 'Tab 1', content: 'Tab body 1' },
    { id: 2, title: 'Tab 2', content: 'Tab body 2' },
    { id: 3, title: 'Tab 3', content: 'Tab body 3' },
  ]);

  const addTab = () => {
    setTabs((_tabs) => [
      ..._tabs,
      {
        id: _tabs.length + 1,
        title: `Tab ${_tabs.length + 1}`,
        content: `Tab body ${_tabs.length + 1}`,
      },
    ]);
  };

  const removeTab = () => {
    if (tabs.length > 1) {
      setTabs((_tabs) => _tabs.slice(0, -1));
    }
  };

  return (
    <section className="flex flex-wrap items-center gap-3 rounded border p-3">
      <Tabs>
        <div className="flex justify-between">
          <TabList
            aria-label="Dynamic tabs"
            items={tabs}
            className="tabs-boxed tabs"
          >
            {(item) => (
              <Tab
                className={({ isSelected }) =>
                  twJoin('tab', isSelected && 'tab-active')
                }
              >
                {item.title}
              </Tab>
            )}
          </TabList>

          <div className="">
            <Button className="btn btn-sm" onPress={addTab}>
              Add tab
            </Button>
            <Button className="btn btn-sm" onPress={removeTab}>
              Remove tab
            </Button>
          </div>
        </div>

        <Collection items={tabs}>
          {(item) => <TabPanel>{item.content}</TabPanel>}
        </Collection>
      </Tabs>
    </section>
  );
}
