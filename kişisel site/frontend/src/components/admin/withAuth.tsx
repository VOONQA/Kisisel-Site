import { useEffect } from 'react'
import { useRouter } from 'next/router'

export function withAuth(WrappedComponent: React.ComponentType) {
  return function WithAuth(props: any) {
    const router = useRouter()

    useEffect(() => {
      const isAdmin = sessionStorage.getItem('isAdmin')
      if (!isAdmin) {
        router.replace('/admin/login')
      }
    }, [])

    return <WrappedComponent {...props} />
  }
} 