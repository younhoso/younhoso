import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../lib/axios";
import Button from "../components/Button";
import Avatar from "../components/Avatar";
import { AvatarImageLabels } from "../assets/avatar";
import AvatarSelector from "../components/AvatarSelector";
import styles from "./AvatarEditPage.module.css";
import { useAuth } from "../contexts/AuthProvider";

function AvatarProperties({
  avatar: { skin, hairType, hairColor, clothes, accessories },
}) {
  return (
    <div className={styles.AvatarProperties}>
      <h2 className={styles.AvatarPropertiesTitle}>적용된 속성들</h2>
      <div className={styles.Properties}>
        <div className={styles.PropertyName}>피부 색:</div>
        <div className={styles.PropertyValue}>
          {AvatarImageLabels.skin[skin]}
        </div>
        <div className={styles.PropertyName}>머리 종류:</div>
        <div className={styles.PropertyValue}>
          {AvatarImageLabels.hairType[hairType]}
        </div>
        <div className={styles.PropertyName}>머리 색:</div>
        <div className={styles.PropertyValue}>
          {AvatarImageLabels.hairColor[hairColor]}
        </div>
        <div className={styles.PropertyName}>옷:</div>
        <div className={styles.PropertyValue}>
          {AvatarImageLabels.clothes[clothes]}
        </div>
        <div className={styles.PropertyName}>액세서리:</div>
        <div className={styles.PropertyValue}>
          {AvatarImageLabels.accessories[accessories]}
        </div>
      </div>
    </div>
  );
}

function AvatarEditPage() {
  const { avatar: initialAvatar, updateAvatar } = useAuth();
  const [avatar, setAvatar] = useState(null);
  const navigate = useNavigate();

  function handleSelectProperty(key, value) {
    setAvatar({
      ...avatar,
      [key]: value,
    });
  }

  function handleCancelClick() {
    navigate(-1);
  }

  async function handleSubmit() {
    await updateAvatar(avatar);
    navigate("/me");
  }

  if (!avatar) return null;

  return (
    <>
      <div className={styles.Container}>
        <nav className={styles.Nav}>
          <Button appearance="minimal" onClick={handleCancelClick}>
            취소
          </Button>
          <Button onClick={handleSubmit}>저장하기</Button>
        </nav>
        <div className={styles.Preview}>
          <div className={styles.AvatarContainer}>
            <AvatarProperties avatar={avatar} />
            <Avatar withBorder value={avatar} />
          </div>
        </div>
        <div className={styles.Footer}>
          <AvatarSelector avatar={avatar} onSelect={handleSelectProperty} />
        </div>
      </div>
    </>
  );
}

export default AvatarEditPage;
