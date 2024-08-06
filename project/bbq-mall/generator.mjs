import { exec } from 'child_process';
import fs from 'fs';
import { readdir } from 'fs/promises';
import inquirer from 'inquirer';
import inquirerPrompt from 'inquirer-autocomplete-prompt';
import ora from 'ora';
import util from 'util';

inquirer.registerPrompt('autocomplete', inquirerPrompt);

const PAGE_DIR = './src/app';
const PAGE_STYLED_DIR = './src/styles/pageStyled';
const COMPONENT_DIR = './src/components';

const capitalize = str => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const getDirectories = async source =>
  (await readdir(source, { withFileTypes: true }))
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

const createIndexFileText = name => {
  return [`export * from './${name}';`, `export { default } from './${name}';`, ``].join('\n');
};

const createComponentFileText = name => {
  return [
    `'use client'`,
    ``,
    `import clsx from 'clsx';`,
    ``,
    `import { ${name}Styled } from './styled';`,
    ``,
    `export interface ${name}Props {`,
    `  className?: string;`,
    `}`,
    ``,
    `const ${name} = ({ className }: ${name}Props) => {`,
    `  return (`,
    `    <${name}Styled className={clsx('${name}', className)}>`,
    `    </${name}Styled>`,
    `  );`,
    `};`,
    ``,
    `export default ${name};`,
    ``,
  ].join('\n');
};

const createStyledFileText = name => {
  return [
    `'use client'`,
    ``,
    `import styled from 'styled-components';`,
    ``,
    `export const ${name}Styled = styled.div\``,
    `  `,
    `\`;`,
    ``,
  ].join('\n');
};

const createPageFileText = (name, type) => {
  return [
    `'use client'`,
    ``,
    `import { ${capitalize(
      name,
    )}PageStyled } from '@/styles/pageStyled/${type}/${name}PageStyled';`,
    ``,
    `const ${capitalize(name)} = () => {`,
    `  return (`,
    `    <${capitalize(name)}PageStyled>`,
    `      `,
    `    </${capitalize(name)}PageStyled>`,
    `  );`,
    `};`,
    ``,
    `export default ${capitalize(name)};`,
    ``,
  ].join('\n');
};

const createTestFileText = (name, path = name) => {
  return [
    `import { cleanup } from "@testing-library/react";`,
    ``,
    `import { describe, afterAll } from '@jest/globals';`,
    `import { composeStory } from "@storybook/react";`,
    `import meta, { Primary } from "./${path}.stories";`,
    ``,
    `import { customRender } from "@/libs/customRender";`,
    ``,
    `const PrimaryTest = composeStory(Primary, meta);`,
    ``,
    `afterAll(() => {`,
    `  cleanup();`,
    `});`,
    ``,
    `describe('${name === path ? path : name} Test', () => {`,
    `  const mount = customRender(<PrimaryTest />);`,
    ``,
    `  it("Do dummy test", () => {});`,
    `});`,
    ``,
  ].join('\n');
};

const createStorybook = (type, name, path = './index', suffix, parentComponentName) => {
  return [
    `import type { Meta, StoryObj } from "@storybook/react";`,
    ``,
    `import ${capitalize(name)} from "${path}";`,
    ``,
    `const meta = {`,
    `  title: "${type}/${parentComponentName ?? capitalize(name)}${suffix}",`,
    `  component: ${capitalize(name)},`,
    `  parameters: {},`,
    `  tags: ["autodocs"],`,
    `  argTypes: {},`,
    `} satisfies Meta<typeof ${capitalize(name)}>;`,
    ``,
    `export default meta;`,
    `type Story = StoryObj<typeof meta>;`,
    ``,
    `export const Primary: Story = {`,
    `  args: {},`,
    `};`,
    ``,
  ].join('\n');
};

const createPromptInput = options => {
  const { name = 'name', label } = options;

  return {
    type: 'input',
    name,
    message: `${label}:`,
    validate: input => {
      return String(input).trim().length > 0 || `${label} is required`;
    },
  };
};

const editParentComponentExportFile = async parentComponentName => {
  const parentComponentDir = `${COMPONENT_DIR}/${parentComponentName}`;
  const parentComponentExportFile = `${parentComponentDir}/index.ts`;

  const _subComponentNames = await getDirectories(parentComponentDir);
  const subComponentNames = _subComponentNames.filter(v => v !== 'main');

  let texts = [
    `// 자동으로 생성된 파일입니다. 수정하지 마세요.`,
    `import _${parentComponentName} from './main';`,
  ];

  texts.push(
    ...subComponentNames.map(
      subComponentName => `import ${subComponentName} from './${subComponentName}';`,
    ),
  );

  texts.push(
    ...[
      ``,
      `type ${parentComponentName}P = typeof _${parentComponentName};`,
      ``,
      `interface ${parentComponentName}Type extends ${parentComponentName}P {`,
      ...subComponentNames.map(
        subComponentName => `  ${subComponentName}: typeof ${subComponentName};`,
      ),
      `}`,
      ``,
      `const ${parentComponentName} = _${parentComponentName} as ${parentComponentName}Type;`,
      ``,
      ...subComponentNames.map(
        subComponentName => `${parentComponentName}.${subComponentName} = ${subComponentName};`,
      ),
      ``,
      `export default ${parentComponentName};`,
      ``,
    ],
  );

  fs.writeFileSync(parentComponentExportFile, texts.join('\n'));
};

const CreateMainIndex = name => {
  return [
    `import _${name} from "./pc/${name}";`,
    `import ${name}Mobile from "./mobile/${name}Mobile";`,
    ``,
    `type ${name}P = typeof _${name};`,
    ``,
    `interface ${name}Type extends ${name}P {`,
    `  Mobile: typeof ${name}Mobile;`,
    `}`,
    ``,
    `const ${name} = _${name} as ${name}Type;`,
    ``,
    `${name}.Mobile = ${name}Mobile;`,
    ``,
    `export default ${name};`,
  ].join('\n');
};

const createComponentAndFileOpen = (dir, name) => {
  fs.mkdirSync(dir + '/main' + '/mobile', { recursive: true });
  fs.mkdirSync(dir + '/main' + '/pc', { recursive: true });
  fs.writeFileSync(`${dir}/main/mobile/styled.ts`, createStyledFileText(name + 'Mobile'));
  fs.writeFileSync(
    `${dir}/main/mobile/${name}Mobile.tsx`,
    createComponentFileText(name + 'Mobile'),
  );
  fs.writeFileSync(`${dir}/main/pc/styled.ts`, createStyledFileText(name));
  fs.writeFileSync(`${dir}/main/pc/${name}.tsx`, createComponentFileText(name));
  fs.writeFileSync(`${dir}/main/index.ts`, CreateMainIndex(name));
  fs.writeFileSync(`${dir}/index.ts`, createIndexFileText('main'));

  console.log(`🎉 Component [${name}] created`);
  console.log(`📂 Open file...`);

  exec(`code -g ${dir}/${name}.tsx:15:17`);
};

const pretty = async () => {
  const spinner = ora('🚀  Code formatting...It will take about 10seconds').start();
  const promisedExec = util.promisify(exec);
  await promisedExec('yarn pretty');
  spinner.succeed('🎉  Done!');
};

const start = async () => {
  const { type } = await inquirer.prompt([
    {
      type: 'list',
      name: 'type',
      message: 'Choose type',
      choices: ['page', 'component', 'sub-component'],
      default: 'page',
    },
  ]);

  switch (type) {
    case 'component': {
      const { componentName } = await inquirer.prompt([
        createPromptInput({
          name: 'componentName',
          label: 'Component name (PascalCase)',
        }),
      ]);

      const componentDir = `${COMPONENT_DIR}/${componentName}`;

      if (fs.existsSync(componentDir)) {
        console.log(`🛑 Component [${componentName}] already exists`);
        process.exit(0);
      }

      const { createTest } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'createTest',
          message: 'Create test?',
          default: false,
        },
      ]);

      createComponentAndFileOpen(componentDir, componentName);

      if (createTest) {
        fs.writeFileSync(
          `${componentDir}/main/mobile/${componentName + 'Mobile'}.test.tsx`,
          createTestFileText(componentName, componentName + 'Mobile'),
        );
        fs.writeFileSync(
          `${componentDir}/main/mobile/${componentName + 'Mobile'}.stories.ts`,
          createStorybook(type, componentName, `./${componentName}Mobile`, '/mobile'),
        );

        fs.writeFileSync(
          `${componentDir}/main/pc/${componentName}.test.tsx`,
          createTestFileText(componentName),
        );
        fs.writeFileSync(
          `${componentDir}/main/pc/${componentName}.stories.ts`,
          createStorybook(type, componentName, `./${componentName}`, '/pc'),
        );
      }

      await pretty();

      break;
    }

    case 'sub-component': {
      const componentNames = await getDirectories(COMPONENT_DIR);

      const { parentComponentName } = await inquirer.prompt([
        {
          type: 'autocomplete',
          name: 'parentComponentName',
          message: 'Choose component',
          source: (_, input) => {
            return componentNames.filter(name =>
              name.toLowerCase().includes((input || '').toLowerCase()),
            );
          },
        },
      ]);

      const { componentName } = await inquirer.prompt([
        createPromptInput({
          name: 'componentName',
          label: 'Sub component name (PascalCase)',
        }),
      ]);

      const componentDir = `${COMPONENT_DIR}/${parentComponentName}/${componentName}`;

      if (fs.existsSync(componentDir)) {
        console.log(`🛑 Component [${componentName}] already exists`);
        process.exit(0);
      }

      const { createTest } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'createTest',
          message: 'Create test?',
          default: false,
        },
      ]);
      createComponentAndFileOpen(componentDir, componentName);

      if (createTest) {
        fs.writeFileSync(
          `${componentDir}/main/mobile/${componentName + 'Mobile'}.test.tsx`,
          createTestFileText(componentName, componentName + 'Mobile'),
        );
        fs.writeFileSync(
          `${componentDir}/main/mobile/${componentName + 'Mobile'}.stories.ts`,
          createStorybook(
            'component',
            componentName,
            `./${componentName}Mobile`,
            `/${componentName}/mobile`,
            parentComponentName,
          ),
        );

        fs.writeFileSync(
          `${componentDir}/main/pc/${componentName}.test.tsx`,
          createTestFileText(componentName),
        );
        fs.writeFileSync(
          `${componentDir}/main/pc/${componentName}.stories.ts`,
          createStorybook(
            'component',
            componentName,
            `./${componentName}`,
            `/${componentName}/pc`,
            parentComponentName,
          ),
        );
      }

      await editParentComponentExportFile(parentComponentName);

      await pretty();

      break;
    }

    case 'page': {
      let { pagePathInput } = await inquirer.prompt([
        createPromptInput({
          name: 'pagePathInput',
          label: 'Page path (ex: sign/in = sign/in.tsx) (lowercase)',
        }),
      ]);

      const { createTest } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'createTest',
          message: 'Create test?',
          default: false,
        },
      ]);

      pagePathInput = String(pagePathInput.replace(/\.tsx?/, '')).toLowerCase();

      const create = type => {
        const pagePath = `${PAGE_DIR}/${type}/${pagePathInput}/page.tsx`;
        const dir = pagePath.split('/').slice(0, -1).join('/');
        const nameArray = [type, ...pagePathInput.split('/')];

        // camelCase 처리
        let name = nameArray
          .reduce((acc, item, i) => {
            if (i === 0) return [item];

            if (i === nameArray.length - 1) {
              if (item === 'index' && dir !== './pages') {
                const name = dir.split('/').pop();

                return [...acc.slice(0, -1), nameArray.length === 2 ? name : capitalize(name)];
              }
            }

            return [...acc, capitalize(item)];
          }, [])
          .join('');

        // 페이지 파일 중복 체크
        if (fs.existsSync(pagePath)) {
          console.log(`🛑 [${pagePath}] already exists`);
          process.exit(0);
        }

        // 페이지 스타일 파일 중복 체크
        if (fs.existsSync(`${PAGE_STYLED_DIR}/${name}PageStyled.ts`)) {
          console.log(`🛑 [${PAGE_STYLED_DIR}/${name}PageStyled.ts] already exists`);
          process.exit(0);
        }

        // 페이지 dir이 없다면 생성
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }

        // 페이지 스타일 dir이 없다면 생성
        if (!fs.existsSync(PAGE_STYLED_DIR)) {
          fs.mkdirSync(PAGE_STYLED_DIR, { recursive: true });
        }

        // 페이지 스타일 파일 생성
        fs.writeFileSync(
          `${PAGE_STYLED_DIR}/${type}/${name}PageStyled.ts`,
          createStyledFileText(capitalize(name) + 'Page'),
        );

        fs.writeFileSync(pagePath, createPageFileText(name, type));

        if (createTest) {
          fs.writeFileSync(`${dir}/page.test.tsx`, createTestFileText(capitalize(name), 'page'));
          fs.writeFileSync(`${dir}/page.stories.ts`, createStorybook(type, name, './page'));
        }

        return { name, pagePath };
      };

      // 페이지 파일 생성
      const { name, pagePath } = create('pc');
      const { name: mobileName, pagePath: mobilePath } = create('mobile');

      console.log(`🎉 Page [${(name, mobileName)}] created`);
      console.log(`📂 Open file...`);

      exec(`code -g ${pagePath},${mobilePath}:6:7`);
      await pretty();
      break;
    }
  }
};

start();
