import type { PropsWithChildren } from 'react'
import type { AriaRadioGroupProps } from 'react-aria'
import { useRadioGroup } from 'react-aria'
import { useRadioGroupState } from 'react-stately'
import { RadioContext } from './context'

type Props = PropsWithChildren<AriaRadioGroupProps>

export function TheRadioGroup(props: Props) {
  const { children, label, description, errorMessage } = props
  const state = useRadioGroupState(props)
  const {
    radioGroupProps,
    labelProps,
    descriptionProps,
    errorMessageProps,
    validationDetails,
    validationErrors,
    isInvalid,
  } = useRadioGroup(props, state)

  return (
    <div {...radioGroupProps}>
      <span {...labelProps}>{label}</span>

      <RadioContext.Provider value={state}>{children}</RadioContext.Provider>

      {description && <p {...descriptionProps}>{description}</p>}
      {errorMessage && state.isInvalid && (
        <p {...errorMessageProps} className="text-error">
          {typeof errorMessage === 'function'
            ? errorMessage({ validationDetails, validationErrors, isInvalid })
            : errorMessage}
        </p>
      )}
    </div>
  )
}
