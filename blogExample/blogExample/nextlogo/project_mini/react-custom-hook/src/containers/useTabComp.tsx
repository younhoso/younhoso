import useTabs from '../hooks/useTabs';

const contents = [
  {
    tab: 'Section 1',
    content: "I'm the content of the Section 1",
  },
  {
    tab: 'Section 2',
    content: "I'm the content of the Section 2",
  },
  {
    tab: 'Section 3',
    content: "I'm the content of the Section 3",
  },
];

const UseTabComp = () => {
  const { currentItem, changeItem } = useTabs(0, contents);

  return (
    <div>
      {contents.map((section, index) => (
        <button key={index} onClick={() => changeItem(index)}>
          {section.tab}
        </button>
      ))}
      <div>{currentItem.content}</div>
    </div>
  );
};

export default UseTabComp;
