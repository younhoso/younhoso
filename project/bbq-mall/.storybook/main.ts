import type { StorybookConfig } from '@storybook/nextjs';

import path from 'path';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

export default {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  staticDirs: [{ from: '../public/fonts', to: '/fonts' }],
  webpackFinal: async (config, { configType }) => {
    if (!config.resolve) return config;

    return {
      ...config,
      resolve: {
        ...config.resolve,
        plugins: [
          ...(config.resolve.plugins ?? []),
          new TsconfigPathsPlugin({
            extensions: config.resolve.extensions,
            configFile: path.resolve(__dirname, '../tsconfig.json'),
          }),
        ],
        modules: [path.resolve(__dirname, '..', 'src'), 'node_modules'],
        alias: {
          ...config.resolve.alias,
          '@/src': path.resolve(__dirname, '../src'),
        },
      },
    };
  },
} as StorybookConfig;
