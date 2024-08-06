const fs = require('fs');
const inquirer = require('inquirer');
const exec = require('child_process').exec;

const createIndexFileText = name => {
  return [
    `export * from './${name}';`,
    `export { default } from './${name}';`,
    ``,
  ].join('\n');
};

const createComponentFileText = name => {
  return [
    `import clsx from 'clsx';`,
    ``,
    `import { ${name}Styled } from './styled';`,
    ``,
    `interface ${name}Props {`,
    `  className?: string;`,
    `}`,
    ``,
    `const ${name} = ({ className }: ${name}Props) => {`,
    `  return (`,
    `    <${name}Styled className={clsx('${name}', className)}>`,
    `      `,
    `    </${name}Styled>`,
    `  )`,
    `}`,
    ``,
    `export default ${name}`,
    ``,
  ].join('\n');
};

const createStyledFileText = name => {
  return [
    `import styled from 'styled-components';`,
    ``,
    `export const ${name}Styled = styled.div\``,
    `  `,
    `\``,
    ``,
  ].join('\n');
};

inquirer
  .prompt([
    {
      type: 'list',
      name: 'type',
      message: 'Choose a component type',
      choices: ['atoms', 'molecules', 'organisms', 'templates'],
      default: 'atoms',
    },
    {
      type: 'input',
      name: 'name',
      message: 'Component name (pascal case):',
      validate: input => {
        return String(input).trim().length > 0 || 'Component name is required';
      },
    },
  ])
  .then(answers => {
    const { type, name } = answers;
    const path = `./components/${type}/${name}`;

    if (!fs.existsSync(`./components/${type}`)) {
      fs.mkdirSync(`./components/${type}`);
    }

    if (fs.existsSync(path)) {
      console.log(`🛑 Component [${name}] already exists`);
      process.exit(0);
    }

    fs.mkdirSync(path);
    fs.writeFileSync(`${path}/styled.ts`, createStyledFileText(name));
    fs.writeFileSync(`${path}/${name}.tsx`, createComponentFileText(name));
    fs.writeFileSync(`${path}/index.ts`, createIndexFileText(name));

    console.log(`🎉 Component [${name}] created`);
    console.log(`📂 Open file...`);

    exec(`code -g ${path}/${name}.tsx:12:7`);
  });
