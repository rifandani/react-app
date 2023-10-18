import DemoBreadcrumbs from './aria/DemoBreadcrumbs';
import DemoButton from './aria/DemoButton';
import DemoCalendar from './aria/DemoCalendar';
import DemoCheckbox from './aria/DemoCheckbox';
import DemoCheckboxGroup from './aria/DemoCheckboxGroup';
import DemoDateField from './aria/DemoDateField';
import DemoDatePicker from './aria/DemoDatePicker';
import DemoDateRangePicker from './aria/DemoDateRangePicker';
import DemoDialog from './aria/DemoDialog';
import DemoGridList from './aria/DemoGridList';
import DemoListBox from './aria/DemoListBox';
import DemoMenu from './aria/DemoMenu';
import DemoNumberField from './aria/DemoNumberField';
import DemoPopover from './aria/DemoPopover';
import DemoRadioGroup from './aria/DemoRadioGroup';
import DemoRangeCalendar from './aria/DemoRangeCalendar';
import DemoSearchField from './aria/DemoSearchField';
import DemoSlider from './aria/DemoSlider';
import DemoSwitch from './aria/DemoSwitch';
import DemoTable from './aria/DemoTable';
import DemoTabs from './aria/DemoTabs';
import DemoTagGroup from './aria/DemoTagGroup';
import DemoTextField from './aria/DemoTextField';
import DemoTimeField from './aria/DemoTimeField';
import DemoToggleButton from './aria/DemoToggleButton';
import DemoTooltip from './aria/DemoTooltip';
import DemoDaisyAccordion from './daisy/DemoDaisyAccordion';
import DemoDaisyAlert from './daisy/DemoDaisyAlert';
import DemoDaisyAvatar from './daisy/DemoDaisyAvatar';
import DemoDaisyBadge from './daisy/DemoDaisyBadge';

export default function Demo() {
  return (
    <section className="grid h-full grid-cols-1 gap-5 xl:grid-cols-2">
      <div className="flex flex-col space-y-5 p-5">
        <h1 className="text-2xl font-bold text-primary">
          React Aria Components
        </h1>
        <DemoButton />
        {/* <DemoFileTrigger /> does not works */}
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
      </div>

      <div className="flex flex-col space-y-5 p-5">
        <h1 className="text-2xl font-bold text-primary">DaisyUI</h1>
        <DemoDaisyAccordion />
        <DemoDaisyAlert />
        <DemoDaisyAvatar />
        <DemoDaisyBadge />
      </div>
    </section>
  );
}
