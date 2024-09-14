import AvatarSelector from '../components/AvatarSelector';
import Avatar from '../components/Avatar';
import AvatarPlaceholderImage from '../assets/avatar-placeholder.svg';
import useRandomAvatarAnimation from '../hooks/useRandomAvatarAnimation';
import styles from './HomePage.module.css';

function HomePage() {
  const avatar = useRandomAvatarAnimation();

  return (
    <>
      <header className={styles.Header}>
        <h1 className={styles.Heading}>나만의 아바타를 만들어봐요.</h1>
        <p className={styles.Description}>
          1분 만에 만들어보고, 친구들과 공유해봐요!
        </p>
      </header>
      <div className={styles.Preview}>
        <img
          className={styles.AvatarPlaceholder}
          src={AvatarPlaceholderImage}
          alt="아바타 플레이스홀더"
        />
        <img
          className={styles.AvatarPlaceholder}
          src={AvatarPlaceholderImage}
          alt="아바타 플레이스홀더"
        />
        <img
          className={styles.AvatarPlaceholder}
          src={AvatarPlaceholderImage}
          alt="아바타 플레이스홀더"
        />
        <Avatar className={styles.Avatar} withBorder value={avatar} />
        <img
          className={styles.AvatarPlaceholder}
          src={AvatarPlaceholderImage}
          alt="아바타 플레이스홀더"
        />
        <img
          className={styles.AvatarPlaceholder}
          src={AvatarPlaceholderImage}
          alt="아바타 플레이스홀더"
        />
        <img
          className={styles.AvatarPlaceholder}
          src={AvatarPlaceholderImage}
          alt="아바타 플레이스홀더"
        />
      </div>
      <div className={styles.Footer}>
        <AvatarSelector avatar={avatar} onSelect={() => {}} />
      </div>
    </>
  );
}

export default HomePage;
