import { User } from "@/model/user";
import Avatar from "./Avatar";

type Props = {
  useer: User
}

export default function SideBar({useer: {name, username, image}}: Props) {
  
  return (
    <>
      <div>
        {image && <Avatar image={image} />}
        <p>{username}</p>
        <p>{name}</p>
      </div>
      <p>
        About ・ Help ・ Press ・ API ・ Jobs ・ Privacy ・ Terms ・ Location ・ Language
      </p>
      <p>
        @Copyright INSTANTGRAM from METAL
      </p>
    </>
  );
} 