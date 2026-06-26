import { JBMobileInput } from 'jb-mobile-input/react';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: "Components/form elements/Inputs/JBMobileInput",
  component: JBMobileInput,
  argTypes:{
    error:{
      control:{
        type:"text",
      },
      description:"error message"
    }
  }
} satisfies Meta<typeof JBMobileInput>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  args: {
    label: 'mobile',
    message: "please enter your mobile number",
  }
};
export const Required: Story = {
  args: {
    label: 'required',
    required: true,
  }
};
export const RequiredWithMessage: Story = {
  args: {
    label: 'mobile',
    required: 'please enter the full number',
  }
};
