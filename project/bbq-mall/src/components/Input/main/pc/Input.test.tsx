import { composeStory } from '@storybook/react';
import { cleanup } from '@testing-library/react';

import { afterAll, describe } from '@jest/globals';

import { customRender } from '@/libs/customRender';

import meta, { Primary } from './Input.stories';

const PrimaryTest = composeStory(Primary, meta);

afterAll(() => {
  cleanup();
});

describe('Input Test', () => {
  const mount = customRender(<PrimaryTest />);

  it('Do dummy test', () => {});
});
