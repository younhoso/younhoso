import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../lib/axios';
import Card from '../components/Card';
import Avatar from '../components/Avatar';
import styles from './UserPage.module.css';

function UserPage() {
  const [user, setUser] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const params = useParams();
  const userId = params.userId;

  async function getUser(id) {
    const res = await axios.get(`/users/${id}`);
    const nextUser = res.data;
    setUser(nextUser);
  }

  async function getAvatar(id) {
    const res = await axios.get(`/users/${id}/avatar`);
    const nextAvatar = res.data;
    setAvatar(nextAvatar);
  }

  useEffect(() => {
    getUser(userId);
    getAvatar(userId);
  }, [userId]);

  if (!user || !avatar) {
    return null;
  }

  return (
    <>
      <header className={styles.Header}>{user.name}님의 아바타</header>
      <div className={styles.AvatarContainer}>
        <Avatar className={styles.Avatar} value={avatar} />
      </div>
      <Card className={styles.Profile}>
        <div className={styles.Label}>이름</div>
        <div className={styles.Name}>{user.name}</div>
        <div className={styles.Label}>이메일</div>
        <div className={styles.Email}>{user.email}</div>
      </Card>
    </>
  );
}

export default UserPage;
