import Link from 'next/link'
import Auth from "../components/auth/auth";

export default function SignUp(): JSX.Element {
  return (
    <div style={{ paddingTop: '30px' }}>
      <h2 style={{ textAlign: 'center', fontSize: '26px', margin: '0 0 18px 0' }}>
        Создать аккаунт
      </h2>
      <Auth btnText="Зарегистрироваться" />
      <p style={{ marginTop: '35px', fontSize: '18px', textAlign: 'center' }}>
        <Link href="/sign-in">
          <a style={{ color: '#0066FF', textDecoration: 'underline' }}>
            Войдите в аккаунт
          </a>
        </Link>
        <span>, если он есть.</span>
      </p>
    </div>
  );
}