import useConfirm from '../hooks/useConfirm';

const UseConfirmComp = () => {
  const deleteWord = () => console.log('Deleting the word...');
  const abort = () => console.log('Aborted');
  const confirmDelete = useConfirm('Are you sure?', deleteWord, abort);
  return (
    <div>
      <button onClick={confirmDelete}>Delete the world</button>
    </div>
  );
};

export default UseConfirmComp;
