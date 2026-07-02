import { JBMobileInput } from 'jb-mobile-input/react';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, waitFor } from 'storybook/test';
import { getMessageText, getMobileInput, getNativeInput } from './test-utils';

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
  },
  play: async ({ canvasElement, args }) => {
    const mobileInput = getMobileInput(canvasElement);
    const nativeInput = getNativeInput(mobileInput);

    await userEvent.type(nativeInput, '912abc3456789');

    await waitFor(() => {
      expect(mobileInput.value).toBe('09123456789');
      expect(mobileInput.displayValue).toBe('0912 3456789');
      expect(nativeInput.value).toBe('0912 3456789');
      expect(mobileInput.reportValidity()).toBe(true);
      expect(getMessageText(mobileInput)).toBe(args.message);
    });

    nativeInput.focus();
    await userEvent.keyboard('{Control>}a{/Control}{Backspace}');
    await userEvent.type(nativeInput, '09123');

    await waitFor(() => {
      expect(mobileInput.value).toBe('09123');
      expect(mobileInput.reportValidity()).toBe(false);
      expect(getMessageText(mobileInput)).toBe('mobile number is not valid');
      expect(mobileInput.hasState('invalid')).toBe(true);
    });

    nativeInput.focus();
    await userEvent.keyboard('{Control>}a{/Control}{Backspace}');
    await userEvent.type(nativeInput, '۰۹۱۲۳۴۵۶۷۸۹');

    await waitFor(() => {
      expect(mobileInput.value).toBe('09123456789');
      expect(mobileInput.displayValue).toBe('0912 3456789');
      expect(mobileInput.reportValidity()).toBe(true);
      expect(mobileInput.hasState('invalid')).toBe(false);
    });
  }
};
export const Required: Story = {
  args: {
    label: 'required',
    required: true,
  },
  play: async ({ canvasElement }) => {
    const mobileInput = getMobileInput(canvasElement);

    expect(mobileInput.reportValidity()).toBe(false);

    await waitFor(() => {
      expect(mobileInput.hasState('invalid')).toBe(true);
      expect(getMessageText(mobileInput).length).toBeGreaterThan(0);
    });

    mobileInput.value = '09123456789';
    expect(mobileInput.reportValidity()).toBe(true);

    await waitFor(() => {
      expect(mobileInput.hasState('invalid')).toBe(false);
    });
  }
};
export const RequiredWithMessage: Story = {
  args: {
    label: 'mobile',
    required: 'please enter the full number',
  },
  play: async ({ canvasElement, args }) => {
    const mobileInput = getMobileInput(canvasElement);

    expect(mobileInput.reportValidity()).toBe(false);

    await waitFor(() => {
      expect(getMessageText(mobileInput)).toBe(args.required);
      expect(mobileInput.hasState('invalid')).toBe(true);
    });
  }
};
