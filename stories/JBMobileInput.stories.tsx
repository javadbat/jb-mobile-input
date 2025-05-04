import { JBMobileInput, Props } from 'jb-mobile-input/react';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<Props> = {
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
};
export default meta;
type Story = StoryObj<typeof JBMobileInput>;

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
