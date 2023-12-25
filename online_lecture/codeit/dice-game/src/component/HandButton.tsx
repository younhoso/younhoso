import HandIcon from "./HandIcon";
import "./HandButton.css";

type HandButtonProps = {
  value: "rock" | "scissor" | "paper";
  onClick: (v: "rock" | "scissor" | "paper") => void;
};

// CSS 파일로 스타일을 적용해주세요
function HandButton({ value, onClick }: HandButtonProps) {
  const handleClick = () => onClick(value);
  return (
    <button className="HandButton" onClick={handleClick}>
      <HandIcon className="HandButton-icon" value={value} />
    </button>
  );
}

export default HandButton;
