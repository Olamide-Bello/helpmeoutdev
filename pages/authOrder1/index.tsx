import { useContext } from 'react'
import { useRouter } from 'next/router'
import { GlobalContext } from '@/context/GlobalContext'

const withAuth = (WrappedComponent: any) => {
  const ComponentWithAuth = (props: any) => {
    const router = useRouter()
    const { user, logged } = useContext(GlobalContext)

    if (user === '' && logged === false) {
      // Redirect to the signUp page
      if (typeof window !== 'undefined') {
        router.replace('/logIn')
      }
    return null
    }

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

export default withAuth
