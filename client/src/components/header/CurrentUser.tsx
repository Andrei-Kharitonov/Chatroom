import { useEffect } from 'react';
import Link from 'next/dist/client/link';
import { useDispatch, useSelector } from "react-redux";
import { getUserFromLocalStorage } from '../../store/userSlice';
import styles from './styles/CurrentUser.module.scss';
import { RootState } from '../../store/store';

export default function CurrentUser(): JSX.Element {
  let avatarImg: boolean = false;
  let dispatch = useDispatch();
  let user = useSelector((state: RootState) => state.user.currentUser);
  let isRegistred = useSelector((state: RootState) => state.user.isRegistred);

  useEffect(() => {
    dispatch(getUserFromLocalStorage());
  }, []);

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
          <Link href={isRegistred ? "/profile" : "/sign-up"}>
            <a style={{ color: user.banned ? '#ff2222' : 'inherit' }}>{user.login}</a>
          </Link>
        </div>
        <div className={styles.user__post}>
          {user.post[0].toUpperCase() + user.post.slice(1)}
        </div>
      </div>
    </div>
  );
}