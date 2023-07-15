import { signIn, signOut, useSession } from 'next-auth/client'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Home() {
  const [session, loading] = useSession()

  return (
    <div>
      <Header />
      <main>
        {!session && <>
          Not signed in <br/>
          <button onClick={signIn}>Sign in</button>
        </>}
        {session && <>
          Signed in as {session.user.email} <br/>
          <Link href="/dashboard">
            <a>Go to Dashboard</a>
          </Link>
          <button onClick={signOut}>Sign out</button>
        </>}
      </main>
      <Footer />
    </div>
  )
}