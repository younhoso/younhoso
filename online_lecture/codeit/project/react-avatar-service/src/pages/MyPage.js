import { Link, useNavigate } from "react-router-dom";
import axios from "../lib/axios";
import Card from "../components/Card";
import Button from "../components/Button";
import styles from "./MyPage.module.css";
import SettingImage from "../assets/setting.svg";
import DownloadImage from "../assets/download.svg";
import ShareImage from "../assets/share.svg";
import EditImage from "../assets/edit.svg";
import Avatar from "../components/Avatar";
import downloadAvatar from "../lib/downloadAvatar";
import { useToaster } from "../contexts/ToasterProvider";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthProvider";

function MyPage() {
  const navigate = useNavigate();
  const toast = useToaster();
  const { user, avatar } = useAuth();

  function handleEditClick() {
    navigate("/me/edit");
  }

  function handleDownloadClick() {
    downloadAvatar(avatar, user.name);
  }

  function handleShareClick() {
    const url = `${window.location.origin}/${user.id}`;
    navigator.clipboard.writeText(url);
    toast("info", "공유 링크를 복사했어요.");
  }

  if (!user || !avatar) {
    return null;
  }

  return (
    <>
      <header className={styles.Header}>내 아바타</header>
      <div className={styles.AvatarContainer}>
        <Link className={styles.AvatarEditLink} to="/me/avatar/edit">
          <img src={SettingImage} alt="설정" />
        </Link>
        <Avatar className={styles.Avatar} value={avatar} />
      </div>
      <Button className={styles.Button} onClick={handleDownloadClick}>
        <img src={DownloadImage} alt="다운로드" />
        다운받기
      </Button>
      <Button
        className={styles.Button}
        appearance="secondary"
        onClick={handleShareClick}
      >
        <img src={ShareImage} alt="공유" />
        공유하기
      </Button>
      <Card className={styles.Profile} onClick={handleEditClick}>
        <div className={styles.Label}>이름</div>
        <div className={styles.Name}>{user.name}</div>
        <div className={styles.Label}>이메일</div>
        <div className={styles.Email}>{user.email}</div>
        <img src={EditImage} alt="편집" className={styles.Edit} />
      </Card>
    </>
  );
}

export default MyPage;
