import React from 'react'
import { Button } from  '@/components/ui/button'
import { Link } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import { UserButton } from '@clerk/clerk-react'
import { FileText } from 'lucide-react'

function Header() {
  const { user, isSignedIn } = useUser();
  return (
    <>
    <div className="text-xl backdrop-blur-md bg-transparent w-full z-[50] fixed top-0 left-0 flex items-center justify-between p-3 shadow-md px-4">
      <div className='flex w-100items-center gap-2'>
        <Link to="/" className='cursor-pointer flex items-center gap-1'>
      <h4 className='text-3xl'>Resumate</h4>
<FileText size={30}  color="#7c3aed" />
</Link>
</div>
      {isSignedIn ? (
        <div className='flex gap-5'>
          <Link to="/dashboard">
        <Button variant='outline'>Dashboard</Button>
        </Link>
       <UserButton />
       </div>
      ) : (
         <Link to ="/auth/sign-in">
      <Button className='bg-purple-600'>Get started</Button>
      </Link>
      )}
    
    
      </div>
    </>
  )
}

export default Header
