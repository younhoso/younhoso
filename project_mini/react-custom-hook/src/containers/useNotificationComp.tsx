import useNotification from '../hooks/useNotification';

const UseNotificationComp = () => {
  const triggerNotif = useNotification('Hello', {
    body: 'hello2',
  });
  return <button onClick={triggerNotif}>hello</button>;
};

export default UseNotificationComp;
