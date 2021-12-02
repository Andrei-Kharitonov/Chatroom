import Link from 'next/link'
import styles from '../styles/authPage.module.scss';
import Auth from '../components/auth/auth';

export default function SignUp(): JSX.Element {
  return (
    <div className={styles.container}>
      <h2 className="title">
        Создать аккаунт
      </h2>
      <Auth btnText="Зарегистрироваться" />
      <p className={styles.text}>
        <Link href="/sign-in">
          <a>
            Войдите в аккаунт
          </a>
        </Link>
        <span>, если он есть.</span>
      </p>
    </div>
  );
}