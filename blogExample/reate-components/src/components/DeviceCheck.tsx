import { useDeviceTypeContext } from "../context/DeviceType";

export default function DeviceCheck() {
  const deviceType = useDeviceTypeContext();
  
  return (
    <div>
      <h1>Current device type: {deviceType}</h1>
    </div>
  );
}