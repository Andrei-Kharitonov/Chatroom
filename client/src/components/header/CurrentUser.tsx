import Link from 'next/dist/client/link';
import styles from './styles/CurrentUser.module.scss';

export default function CurrentUser(): JSX.Element {
  let avatarImg: boolean = false;

  return (
    <div className={styles.user}>
      <div
        className={styles.user__avatar}
        style={{ background: avatarImg ? '' : '#c4c4c4' }}
      >
        {avatarImg ? <img src="#" alt="avatar" /> : ''}
      </div>
      <div className={styles.user__info}>
        <div className={styles.user__name}>
          <Link href="/profile">
            <a>Андрей Харитонов</a>
          </Link>
        </div>
        <div className={styles.user__post}>Admin</div>
      </div>
    </div>
  );
}