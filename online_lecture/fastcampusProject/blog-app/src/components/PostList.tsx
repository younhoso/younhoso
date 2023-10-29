import { useState } from "react";
import { Link } from "react-router-dom";

type PostListProps = {
  hasNavitation?: boolean;
}

type TabType = "all" | "my"

export default function PostList({hasNavitation = true}: PostListProps) {
  const [activeTab, setActiveTab] = useState<TabType>("all");

  return (
    <>
    {
      hasNavitation && (
        <div className="post__navigation">
          <div
            role="presentation"
            onClick={() => setActiveTab("all")}
            className={activeTab === "all" ? "post__navigation--active" : ""}>전체</div>
          <div 
            role="presentation"
            onClick={() => setActiveTab("my")}
            className={activeTab === "my" ? "post__navigation--active" : ""}>나의 글</div>
        </div>
      )
    }
    <div className="post__list">
      {[...Array(10)].map((e, idx) => (
        <div key={idx} className="post__box">
          <Link to={`/posts/${idx}`}>
            <div className="post__profile-box">
              <div className="post__profile"></div>
              <div className="post__author-name">패스트캠퍼스</div>
              <div className="post__date">2023.07.08 토요일</div>
            </div>
            <div className="post__title">게시글 {idx}</div>
            <div className="post__text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla natus cumque temporibus itaque error iste maxime quidem non dicta, quae quia tenetur ab accusantium tempora! Eligendi ab reiciendis corporis dignissimos.
            </div>
            <div className="post__utils-box">
              <div className="post__delete">삭제</div>
              <div className="post__edit">수정</div>
            </div>
          </Link>
        </div>
      ))}
    </div>
    </>
  );
} 