import { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import { GlobalContext } from '@/context/GlobalContext'

const withAuth2 = (WrappedComponent: any) => {
  const ComponentWithAuth = (props: any) => {
    const router = useRouter()
    const { user, logged } = useContext(GlobalContext)

    useEffect(() => {
      if (typeof window !== 'undefined') {
        const retrieved = localStorage.getItem('logged')
        const savedUser = localStorage.getItem('user')
        if (savedUser && retrieved) {
          // Redirect to the signUp page
          router.replace('/videos')

        }
      }
    },[])

    return <WrappedComponent {...props} />
  }

  // Set the displayName for the HOC
  ComponentWithAuth.displayName = `withAuth(${getDisplayName(WrappedComponent)})`

  return ComponentWithAuth
}

// Helper function to get the display name of a component
function getDisplayName(WrappedComponent: any) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

export default withAuth2
