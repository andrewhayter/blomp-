import { useRouter } from 'next/router'
import useSWR from 'swr'
import ProfileCard from '../../components/ProfileCard'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Profile() {
  const router = useRouter()
  const { id } = router.query
  const { data, error } = useSWR(`/api/user/${id}`, fetcher)

  if (error) return <div>Failed to load user</div>
  if (!data) return <div>Loading...</div>

  return (
    <div>
      <Header />
      <main>
        <ProfileCard user={data.user} />
      </main>
      <Footer />
    </div>
  )
}

export async function getServerSideProps(context) {
  const { id } = context.params
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/${id}`)
  const data = await res.json()

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: { data }, 
  }
}