import { createContext, useState, useEffect, useContext, ReactNode } from 'react';

// DeviceType를 생성합니다.
const DeviceTypeContext = createContext("desktop");

// DeviceType 컴포넌트를 생성합니다.
export const DeviceType = ({ children }: { children?: ReactNode }) => {
  const [deviceType, setDeviceType] = useState("desktop");

  useEffect(() => {
    const userAgent = navigator.userAgent;
    if (/Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/.test(userAgent)) {
      setDeviceType("mobile");
    } else if(/Tablet|iPad|PlayBook/.test(userAgent)) {
      setDeviceType("tablet");
    } else {
      setDeviceType("desktop");
    }
  }, []);
  
  return (
    <DeviceTypeContext.Provider value={deviceType}>
      {children}
    </DeviceTypeContext.Provider>
  );
};

export function useDeviceTypeContext () {
  return useContext(DeviceTypeContext);
};