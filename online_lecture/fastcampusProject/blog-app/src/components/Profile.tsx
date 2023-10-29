import { Link } from "react-router-dom";

export default function Profile() {
  
  return (
    <div className="profile__box">
      <div className="flex__box-lg">
        <div className="profile_image"></div>
        <div>
          <div className="profile__email">text@test.com</div>
          <div className="profile__naem">소윤호</div>
        </div>
      </div>
      <Link to="/" className="profile__logout">
        로그아웃
      </Link>
    </div>
  );
} 