import { DemoBreadcrumbs } from './aria/demo-breadcrumbs'
import { DemoButton } from './aria/demo-button'
import { DemoCalendar } from './aria/demo-calendar'
import { DemoCheckbox } from './aria/demo-checkbox'
import { DemoCheckboxGroup } from './aria/demo-checkbox-group'
import { DemoCombobox } from './aria/demo-combobox'
import { DemoDateField } from './aria/demo-date-field'
import { DemoDatePicker } from './aria/demo-date-picker'
import { DemoDateRangePicker } from './aria/demo-date-range-picker'
import { DemoDialog } from './aria/demo-dialog'
import { DemoFileTrigger } from './aria/demo-file-trigger'
import { DemoGridList } from './aria/demo-grid-list'
import { DemoListBox } from './aria/demo-list-box'
import { DemoMenu } from './aria/demo-menu'
import { DemoMeter } from './aria/demo-meter'
import { DemoNumberField } from './aria/demo-number-field'
import { DemoPopover } from './aria/demo-popover'
import { DemoProgressBar } from './aria/demo-progress-bar'
import { DemoRadioGroup } from './aria/demo-radio-group'
import { DemoRangeCalendar } from './aria/demo-range-calendar'
import { DemoSearchField } from './aria/demo-search-field'
import { DemoSelect } from './aria/demo-select'
import { DemoSlider } from './aria/demo-slider'
import { DemoSwitch } from './aria/demo-switch'
import { DemoTable } from './aria/demo-table'
import { DemoTabs } from './aria/demo-tabs'
import { DemoTagGroup } from './aria/demo-tag-group'
import { DemoTextField } from './aria/demo-text-field'
import { DemoTimeField } from './aria/demo-time-field'
import { DemoToggleButton } from './aria/demo-toggle-button'
import { DemoTooltip } from './aria/demo-tooltip'
import { DemoDaisyAccordion } from './daisy/demo-daisy-accordion'
import { DemoDaisyAlert } from './daisy/demo-daisy-alert'
import { DemoDaisyAvatar } from './daisy/demo-daisy-avatar'
import { DemoDaisyBadge } from './daisy/demo-daisy-badge'

export function Demo() {
  return (
    <section className="grid h-full grid-cols-1 gap-5 xl:grid-cols-2">
      <div className="flex flex-col space-y-5 p-5">
        <h1 className="text-2xl font-bold text-primary">
          React Aria Components
        </h1>
        <DemoButton />
        <DemoFileTrigger />
        <DemoToggleButton />

        <DemoGridList />
        <DemoListBox />
        <DemoMenu />
        <DemoTable />
        <DemoTagGroup />

        <DemoCalendar />
        <DemoDateField />
        <DemoDatePicker />
        <DemoDateRangePicker />
        <DemoRangeCalendar />
        <DemoTimeField />

        <DemoCheckbox />
        <DemoCheckboxGroup />
        <DemoNumberField />
        <DemoRadioGroup />
        <DemoSearchField />
        <DemoSlider />
        <DemoSwitch />
        <DemoTextField />

        <DemoBreadcrumbs />
        <DemoTabs />

        <DemoDialog />
        <DemoPopover />
        <DemoTooltip />

        <DemoCombobox />
        <DemoSelect />

        <DemoMeter />
        <DemoProgressBar />
      </div>

      <div className="flex flex-col space-y-5 p-5">
        <h1 className="text-2xl font-bold text-primary">DaisyUI</h1>
        <DemoDaisyAccordion />
        <DemoDaisyAlert />
        <DemoDaisyAvatar />
        <DemoDaisyBadge />
      </div>
    </section>
  )
}
