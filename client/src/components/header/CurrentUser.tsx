import { useEffect } from 'react';
import Link from 'next/dist/client/link';
import { useDispatch, useSelector } from "react-redux";
import { getUserFromLocalStorage, setDefaultUser, setUser } from '../../store/currentUserSlice';
import styles from './styles/CurrentUser.module.scss';
import { RootState } from '../../store/store';
import axios from 'axios';
import { Role } from '../../types/Roles';

export default function CurrentUser(): JSX.Element {
  let avatarImg: boolean = false;
  let dispatch = useDispatch();
  let user = useSelector((state: RootState) => state.currentUser.currentUser);
  let isRegistred = useSelector((state: RootState) => state.currentUser.isRegistred);

  useEffect(() => {
    dispatch(getUserFromLocalStorage());
  }, []);

  useEffect(() => {
    if (user.post != 'none') {
      let update = setInterval(async () => {
        let updateUser = await axios.get(`http://localhost:5000/user/get-by-login?login=${user.login}&password=${user.password}`);

        if (!updateUser.data) {
          dispatch(setDefaultUser());
        } else {
          dispatch(setUser(updateUser.data));
        }
      }, 2000);

      return () => clearInterval(update);
    }
  }, [user]);

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