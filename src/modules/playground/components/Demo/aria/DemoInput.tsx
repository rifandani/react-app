import { Input, Label, TextArea, TextField } from 'react-aria-components';

export default function DemoInput() {
  return (
    <section className="flex flex-wrap gap-3">
      <Input
        name="input-text"
        type="text"
        placeholder="Input here"
        className="input max-w-fit"
      />

      <div className="divider divider-horizontal">atau</div>

      <TextArea
        name="input-textarea"
        placeholder="Textarea here"
        className="input input-bordered max-w-fit"
      />

      <div className="divider divider-horizontal">atau</div>

      <TextField className="flex flex-col">
        <Label htmlFor="email" className="label label-text">
          Email
        </Label>
        <Input id="email" name="email" type="email" className="input" />
        <p slot="description">Enter an email for us to contact you.</p>
      </TextField>

      <div className="divider divider-horizontal">atau</div>

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
        <p className="text-error" slot="errorMessage">
          Please enter a valid email address.
        </p>
      </TextField>
    </section>
  );
}
