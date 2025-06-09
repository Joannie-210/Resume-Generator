import React from 'react'
import { Button } from  '@/components/ui/button'
import { Link } from 'react-router-dom'
import { SignIn} from '@clerk/clerk-react'

const SignInPage = () => {
  return (
    <div className='flex p-3 px-4 shadow-md items-center justify-center h-screen'>
      <SignIn/>
    </div>
  )
}

export default SignInPage
