import { composeStory } from '@storybook/react';
import { cleanup } from '@testing-library/react';

import { afterAll, describe } from '@jest/globals';

import { customRender } from '@/libs/customRender';

import meta, { Font } from './Typography.stories';

const PrimaryTest = composeStory(Font, meta);

afterAll(() => {
  cleanup();
});

describe('Typography Test', () => {
  const mount = customRender(<PrimaryTest />);

  it('Do dummy test', () => {});
});
