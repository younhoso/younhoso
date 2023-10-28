import Image from 'next/image';
import styles from './ShortLinkList.module.css';
import formatDate from '@/lib/formatDate';
import calendarIcon from '@/public/calendar.svg';
import linkIcon from '@/public/link.svg';
import replyIcon from '@/public/reply.svg';
import Card from './Card';
import Button from './Button';
import Link from './Link';

function ShortLinkItem({ value, onDelete }) {
  function handleDelete() {
    onDelete(value._id);
  }

  return (
    <Card>
      <div className={styles.cardContent}>
        <div>
          <div className={styles.title}>{value.title}</div>
          <div className={styles.date}>
            <Image src={calendarIcon} alt="calendar" />
            {formatDate(value.createdAt)}
          </div>
        </div>
        <div className={styles.buttons}>
          <Button
            variant="outline"
            as={Link}
            href={`/short-links/${value._id}`}
          >
            수정
          </Button>
          <Button variant="minimal" type="button" onClick={handleDelete}>
            삭제
          </Button>
        </div>
      </div>
      <Card.Footer>
        <div className={styles.link}>
          <Image src={linkIcon} alt="link" />
          <Link variant="primary" href={`/${value.shortUrl}`} target="_blank">
            {process.env.NEXT_PUBLIC_BASE_URL}/{value.shortUrl}
          </Link>
        </div>
        <div className={styles.link}>
          <Image src={replyIcon} alt="reply" />
          <Link variant="secondary" href={value.url} target="_blank">
            {value.url}
          </Link>
        </div>
      </Card.Footer>
    </Card>
  );
}

export default function ShortLinkList({ items = [], onDelete }) {
  return (
    <ul className={styles.shortLinkList}>
      {items.map((url) => (
        <li key={url._id}>
          <ShortLinkItem value={url} onDelete={() => onDelete(url._id)} />
        </li>
      ))}
    </ul>
  );
}
