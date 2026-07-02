import type { JBMobileInputWebComponent } from 'jb-mobile-input';
import { expect } from 'storybook/test';

export function getMobileInput(canvasElement: HTMLElement, index = 0) {
  const mobileInput = canvasElement.querySelectorAll<JBMobileInputWebComponent>('jb-mobile-input')[index];
  expect(mobileInput).toBeTruthy();
  expect(mobileInput!.shadowRoot).toBeTruthy();
  return mobileInput!;
}

export function getNativeInput(mobileInput: JBMobileInputWebComponent) {
  const input = mobileInput.shadowRoot?.querySelector<HTMLInputElement>('input');
  expect(input).toBeTruthy();
  return input!;
}

export function getMessageText(mobileInput: JBMobileInputWebComponent) {
  return mobileInput.shadowRoot?.querySelector<HTMLElement>('.message-box')?.textContent ?? '';
}
