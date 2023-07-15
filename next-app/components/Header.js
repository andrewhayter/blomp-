import { signOut, useSession } from 'next-auth/client'
import Link from 'next/link'
import styles from '../styles/Header.module.css'

export default function Header() {
  const [session, loading] = useSession()

  return (
    <header className={styles.header}>
      <nav>
        <div>
          <Link href="/">
            <a className={styles.logo}>Linktree Clone</a>
          </Link>
        </div>

        <div>
          {!loading && !session && (
            <>
              <Link href="/login">
                <a className={styles.link}>Login</a>
              </Link>
              <Link href="/signup">
                <a className={styles.link}>Sign up</a>
              </Link>
            </>
          )}

          {!loading && session && (
            <>
              <Link href="/dashboard">
                <a className={styles.link}>Dashboard</a>
              </Link>
              <a className={styles.link} onClick={() => signOut()}>Logout</a>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}