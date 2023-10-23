import { useEffect } from 'react'
import { useRouter } from 'next/router'


const withAuth = (WrappedComponent: any) => {
  const ComponentWithAuth = (props: any) => {
    const router = useRouter()
    
    useEffect(() => {
      if (typeof window !== 'undefined') {
        const retrieved = localStorage.getItem('logged')
        const savedUser = localStorage.getItem('user')
        if (!savedUser && !retrieved) {
          // Redirect to the signUp page
          router.replace('/logIn')

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

export default withAuth
