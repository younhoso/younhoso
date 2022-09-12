const userName = 'So Younho';
const bolder = text => `<b>${text}</b>`

console.log(`
  Hi~ ${userName}
`);

console.log(`
Hi~ ${bolder(userName)}
`);

function div(string, ...fns){
  const flat = s => s.split('\n').join('');

  return function(props){
    return `<div style="${flat(string[0]) + (fns[0] && fns[0](props)) + flat(string[1])}"></div>`;
  }
};

const Div = div`
  font-size: 20px;
  color: ${props => props.active ? 'white' : 'gray'};
  border: none;
`;

console.log(Div({active: true}));