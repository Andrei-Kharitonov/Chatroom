import { useEffect } from 'react';
import Link from 'next/dist/client/link';
import { useDispatch, useSelector } from "react-redux";
import { getUserFromLocalStorage, setDefaultUser, setUser } from '../../store/currentUserSlice';
import styles from './styles/CurrentUser.module.scss';
import { RootState } from '../../store/store';
import { UserAPI } from '../../api/userApi';

export default function CurrentUser(): JSX.Element {
  let user = useSelector((state: RootState) => state.currentUser.currentUser);
  let isRegistred = useSelector((state: RootState) => state.currentUser.isRegistred);
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserFromLocalStorage());
  }, []);

  useEffect(() => {
    if (isRegistred) {
      let update = setInterval(async () => {
        let refreshUser = await UserAPI.getByLogin(user.login, user.password);

        if (refreshUser) {
          dispatch(setUser(refreshUser));
        } else {
          dispatch(setDefaultUser());
          clearInterval(update);
        }
      }, 2000);

      return () => clearInterval(update);
    }
  }, [user]);

  return (
    <div className={styles.user}>
      <div className={styles.user__avatar}>
        {user.avatar.length ? <img className={styles.user__avatar__img} src={user.avatar} /> : ''}
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