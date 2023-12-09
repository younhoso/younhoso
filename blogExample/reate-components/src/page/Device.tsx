import DeviceCheck from "../components/DeviceCheck";
import { DeviceType } from "../context/DeviceType";

export default function Device() {
  return (
    <DeviceType>
      <DeviceCheck />
    </DeviceType>
  );
} 