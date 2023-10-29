import { Link } from "react-router-dom";

export default function PostDetail() {
  
  return (
    <>
      <div className="post__detail">
        <div className="post_box">
          <div className="post__title">
            :Leream
          </div>
          <div className="post__profile-box">
            <div className="post__profile"></div>
            <div className="post__author-name">패스트캠퍼스</div>
            <div className="post__date">2023.07.08 토요일</div>
          </div>
          <div className="post__title">게시글</div>
          <div className="post__utils-box">
            <div className="post__delete">삭제</div>
            <div className="post__edit">
               <Link to={'/posts/edit/1'}> 수정 </Link>
            </div>
          </div>
          <div className="post__text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla natus cumque temporibus itaque error iste maxime quidem non dicta, quae quia tenetur ab accusantium tempora! Eligendi ab reiciendis corporis dignissimos.
          </div>
        </div>
      </div>
    </>
  );
} 