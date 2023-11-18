import useNetwork from '../hooks/useNetwork';

const UseNetworkComp = () => {
  const handleNetworkChange = (online: boolean) => {
    console.log(online ? 'is online' : 'is offline');
  };
  const onLine = useNetwork(handleNetworkChange);
  return <h1>{onLine ? 'OnLine' : 'OffLine'}</h1>;
};

export default UseNetworkComp;
