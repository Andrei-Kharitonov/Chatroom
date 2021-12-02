import Link from 'next/link'
import Auth from "../components/auth/auth";

export default function (): JSX.Element {
  return (
    <div style={{ paddingTop: '30px' }}>
      <h2 style={{ textAlign: 'center', fontSize: '26px', margin: '0 0 18px 0' }}>
        Войти в аккаунт
      </h2>
      <Auth btnText="Войти" />
      <p style={{ marginTop: '35px', fontSize: '18px', textAlign: 'center' }}>
        <Link href="/sign-up">
          <a style={{ color: '#0066FF', textDecoration: 'underline' }}>
            Создайте аккаунт
          </a>
        </Link>
        <span>, если его нет.</span>
      </p>
    </div>
  );
}