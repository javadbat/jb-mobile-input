import { useRef } from 'react';
import { JBButton } from 'jb-button/react';
import { JBMobileInput } from 'jb-mobile-input/react';
import type { Meta, StoryObj } from '@storybook/react-vite';
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

export const InitialValue: Story = {
  render: (args) => {
    const formRef = useRef<HTMLFormElement>(null);
    return (
      <form ref={formRef}>
        <JBMobileInput {...args} />
        <JBButton type="button" onClick={() => formRef.current?.reset()}>Reset</JBButton>
      </form>
    );
  },
  args: {
    label: 'initial mobile',
    initialValue: '0912 3456789',
  },
  play: async ({ canvasElement }) => {
    const mobileInput = getMobileInput(canvasElement);
    const resetButton = canvasElement.querySelector('jb-button')?.shadowRoot?.querySelector<HTMLButtonElement>('button');

    expect(resetButton).toBeTruthy();

    await waitFor(() => {
      // The public baseline uses the same canonical digits as the live value.
      expect(mobileInput.initialValue).toBe('09123456789');
      expect(mobileInput.value).toBe('09123456789');
      expect(mobileInput.displayValue).toBe('0912 3456789');
      expect(mobileInput.isDirty).toBe(false);
    });

    mobileInput.initialValue = '۰۹۳۵۱۲۳۴۵۶۷';

    await waitFor(() => {
      expect(mobileInput.initialValue).toBe('09351234567');
      expect(mobileInput.value).toBe('09351234567');
      expect(mobileInput.isDirty).toBe(false);
    });

    mobileInput.value = '09111234567';
    await userEvent.click(resetButton!);

    await waitFor(() => {
      expect(mobileInput.value).toBe('09351234567');
      expect(mobileInput.isDirty).toBe(false);
    });
  },
};

export const InitialValueDoesNotOverrideValue: Story = {
  args: {
    initialValue: '0912 3456789',
    value: '09351234567',
  },
  play: async ({ canvasElement }) => {
    const mobileInput = getMobileInput(canvasElement);

    await waitFor(() => {
      expect(mobileInput.initialValue).toBe('09123456789');
      expect(mobileInput.value).toBe('09351234567');
      expect(mobileInput.isDirty).toBe(true);
    });
  },
};

export const ExplicitNullValueDoesNotFallBackToInitialValue: Story = {
  args: {
    initialValue: '0912 3456789',
    value: null,
  },
  play: async ({ canvasElement }) => {
    const mobileInput = getMobileInput(canvasElement);

    await waitFor(() => {
      expect(mobileInput.initialValue).toBe('09123456789');
      expect(mobileInput.value).toBe('');
      expect(mobileInput.isDirty).toBe(true);
    });
  },
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
