import { PropsWithChildren } from 'react';
import { AriaRadioGroupProps, useRadioGroup } from 'react-aria';
import { useRadioGroupState } from 'react-stately';
import { RadioContext } from './context';

type Props = PropsWithChildren<AriaRadioGroupProps>;

export default function TheRadioGroup(props: Props) {
  const { children, label, description, errorMessage } = props;
  const state = useRadioGroupState(props);
  const { radioGroupProps, labelProps, descriptionProps, errorMessageProps } =
    useRadioGroup(props, state);

  return (
    <div {...radioGroupProps}>
      <span {...labelProps}>{label}</span>

      <RadioContext.Provider value={state}>{children}</RadioContext.Provider>

      {description && <p {...descriptionProps}>{description}</p>}
      {errorMessage && state.isInvalid && (
        <p {...errorMessageProps} className="text-error">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
