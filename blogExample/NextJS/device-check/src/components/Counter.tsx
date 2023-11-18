'use client';
import { useDeviceTypeContext } from "../context/DeviceType";

export default function Counter() {
  const deviceType = useDeviceTypeContext();

  return (
    <>
      <p>{deviceType}</p>
    </>
  );
}
