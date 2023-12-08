import { ComponentPropsWithRef, useState } from "react";
import {
  Input,
  Label,
  Text,
  TextArea,
  TextField,
  TextFieldProps,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";

interface MyTextFieldProps extends TextFieldProps {
  label?: string;
  inputProps?: ComponentPropsWithRef<typeof Input>;
  description?: string;
  errorMessage?: string;
}

interface MyTextAreaProps extends TextFieldProps {
  label?: string;
  inputProps?: ComponentPropsWithRef<typeof TextArea>;
  description?: string;
  errorMessage?: string;
}

function MyTextField({
  label,
  inputProps,
  description,
  errorMessage,
  ...props
}: MyTextFieldProps) {
  return (
    <TextField {...props}>
      <Label className="label">
        <p className="label-text">{label}</p>
      </Label>

      <Input
        className={({ isInvalid, isDisabled }) =>
          twMerge(
            "input input-bordered",
            isInvalid && "input-error",
            isDisabled && "input-disabled",
          )
        }
        {...inputProps}
      />

      {!props.isInvalid && description && (
        <div className="label">
          <Text className="label-text-alt" slot="description">
            {description}
          </Text>
        </div>
      )}
      {props.isInvalid && errorMessage && (
        <div className="label">
          <Text className="label-text-alt text-error" slot="errorMessage">
            {errorMessage}
          </Text>
        </div>
      )}
    </TextField>
  );
}

function MyTextArea({
  label,
  inputProps,
  description,
  errorMessage,
  ...props
}: MyTextAreaProps) {
  return (
    <TextField {...props}>
      <Label>{label}</Label>

      <TextArea
        className={({ isInvalid, isDisabled }) =>
          twMerge(
            "textarea textarea-bordered",
            isInvalid && "textarea-error",
            isDisabled && "textarea-disabled",
          )
        }
        {...inputProps}
      />

      {!props.isInvalid && description && (
        <Text slot="description">{description}</Text>
      )}
      {props.isInvalid && errorMessage && (
        <Text className="text-error" slot="errorMessage">
          {errorMessage}
        </Text>
      )}
    </TextField>
  );
}

export default function DemoTextField() {
  const [text, setText] = useState("");
  const [textarea, setTextarea] = useState("");

  const isInvalid = text === "invalid";
  const isInvalidTextarea = textarea === "invalid";

  return (
    <section className="flex flex-wrap items-center gap-3 rounded border p-3">
      <MyTextField
        type="text"
        name="text-field"
        label="Message"
        value={text}
        onChange={setText}
        isInvalid={isInvalid}
        errorMessage="Invalid Message"
        inputProps={{ placeholder: "Message..." }}
      />

      <MyTextArea
        type="text"
        name="textarea-field"
        label="Message Area"
        value={textarea}
        onChange={setTextarea}
        isInvalid={isInvalidTextarea}
        errorMessage="Invalid Message Area"
        inputProps={{ placeholder: "Message Area..." }}
      />
    </section>
  );
}
