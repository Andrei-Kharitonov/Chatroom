import Link from 'next/link'
import styles from '../styles/authPage.module.scss';
import Auth from "../components/auth/auth";

export default function (): JSX.Element {
  return (
    <div className={styles.container}>
      <h2 className="title">
        Войти в аккаунт
      </h2>
      <Auth btnText="Войти" />
      <p className={styles.text}>
        <Link href="/sign-up">
          <a>
            Создайте аккаунт
          </a>
        </Link>
        <span>, если его нет.</span>
      </p>
    </div>
  );
}