import { CommentFormStyled } from "./styled";
import SmileIcon from "../ui/icons/SmileIcon";

export default function CommentForm() {
  return (
    <CommentFormStyled className="flex">
      <SmileIcon />
      <input
        className="w-full ml-2 border-none outline-none p-3"
        type="text"
        placeholder="Add a comment..."
      />
      <button className="font-bold text-sky-500 ml-2">Post</button>
    </CommentFormStyled>
  );
}
