import { composeStory } from '@storybook/react';
import { cleanup, screen } from '@testing-library/react';

import { afterAll, describe } from '@jest/globals';

import { customRender } from '@/libs/customRender';

import meta, { TextLinkBtn } from './Button.stories';

const TextLinkBtnTest = composeStory(TextLinkBtn, meta);

afterAll(() => {
  cleanup();
});

describe('Button Test', () => {
  it('On click test', () => {
    const onClickSpy = jest.fn();
    customRender(<TextLinkBtnTest onClick={onClickSpy} />);
    const buttonElement = screen.getByRole('button');
    buttonElement.click();
    expect(onClickSpy).toHaveBeenCalled();
  });
});
