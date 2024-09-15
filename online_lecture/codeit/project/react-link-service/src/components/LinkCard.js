import Card from '../components/Card';
import Link from '../components/Link';
import styles from './LinkCard.module.css';
import OGDefaultImage from '../assets/og-default.png';
import XCircleImage from '../assets/x-circle.svg';

function LinkCard({
  thumbUrl,
  title,
  url,
  onClick,
  onDelete,
}) {
  function handleLinkClick(e) {
    e.stopPropagation();
  }

  function handleDelete(e) {
    e.stopPropagation();
    onDelete();
  }

  return (
    <Card
      className={`${styles.LinkCard} ${onClick ? styles.editable : ''}`}
      onClick={onClick}
    >
      <img className={styles.Thumbnail} src={thumbUrl ?? OGDefaultImage} alt="썸네일 이미지" />
      <div className={styles.Container}>
        <div className={styles.LinkTitle}>{title}</div>
        <Link
          className={styles.LinkUrl}
          appearance="secondary"
          to={url}
          target="_blank"
          onClick={handleLinkClick}
        >
          {url}
        </Link>
      </div>
      {onDelete && (
        <img
          className={styles.LinkDelete}
          src={XCircleImage}
          alt="삭제 아이콘"
          onClick={handleDelete}
        />
      )}
    </Card>
  );
}

export default LinkCard;
