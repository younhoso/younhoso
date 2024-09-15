import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../lib/axios';
import Avatar from '../components/Avatar';
import Card from '../components/Card';
import HorizontalRule from '../components/HorizontalRule';
import styles from './UserPage.module.css';
import LinkCard from '../components/LinkCard';

function UserPage() {
  const [user, setUser] = useState(null);
  const [links, setLinks] = useState([]);
  const params = useParams();
  const userId = params.userId;

  async function getUser(id) {
    const res = await axios.get(`/users/${id}`);
    const nextUser = res.data;
    setUser(nextUser);
  }

  async function getUserLinks(id) {
    const res = await axios.get(`/users/${id}/links`);
    const nextLinks = res.data;
    setLinks(nextLinks);
  }

  useEffect(() => {
    getUser(userId);
    getUserLinks(userId);
  }, [userId]);

  if (!user) return null;

  return (
    <>
      <header className={styles.Header}>
        <Card className={styles.Profile}>
          <Avatar src={user.avatar} alt="프로필 이미지" />
          <div className={styles.Values}>
            <div className={styles.Name}>{user.name}</div>
            <div className={styles.Email}>{user.email}</div>
          </div>
        </Card>
        <p className={styles.Bio}>{user.bio}</p>
      </header>
      <HorizontalRule className={styles.HorizontalRule} />
      <ul className={styles.LinkList}>
        {links.map((link) => (
          <li className={styles.LinkItem} key={link.id}>
            <LinkCard title={link.title} thumbUrl={link.thumbUrl} url={link.url} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default UserPage;
