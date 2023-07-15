import { useState } from 'react';
import { signIn } from 'next-auth/client';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../styles/Login.module.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (response.error) {
      setError(response.error);
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>Login</h2>
        {error && <p className={styles.error}>{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link href="/signup">Sign up</Link>
      </p>
    </div>
  );
}