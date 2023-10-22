import { useContext } from 'react'
import { useRouter } from 'next/router'
import { GlobalContext } from '@/context/GlobalContext'

const withAuth = (WrappedComponent: any) => {
  return (props: any) => {
    const router = useRouter()
    const { user, logged } = useContext(GlobalContext)

    if (user === '' && !logged) {
      // Redirect to the signUp page
      if (typeof window !== 'undefined') {
        router.replace('/signUp');
      }
      return null
    }

    return <WrappedComponent {...props} />
  }
}

export default withAuth
