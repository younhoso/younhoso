import rockImg from "./assets/rock.svg";
import scissorImg from "./assets/scissor.svg";
import paperImg from "./assets/paper.svg";

const IMAGES = {
  rock: rockImg,
  scissor: scissorImg,
  paper: paperImg,
};

type HandIconProps = {
  className?: string;
  value: "rock" | "scissor" | "paper";
};

// className prop을 추가하고, img 태그에 적용해주세요
function HandIcon({ className, value }: HandIconProps) {
  const src = IMAGES[value];
  return <img className={className} src={src} alt={value} />;
}

export default HandIcon;
