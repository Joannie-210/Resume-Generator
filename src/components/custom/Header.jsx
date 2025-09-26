import React from 'react'
import { Button } from  '@/components/ui/button'
import { Link } from 'react-router-dom'
import { FileText } from 'lucide-react'

function Header() {
 
  return (
    <>
    <div className="text-xl backdrop-blur-md bg-transparent w-full z-[50] fixed top-0 left-0 flex items-center justify-between p-3 shadow-md px-4">
      <div className='flex w-100items-center gap-2'>
        <Link to="/" className='cursor-pointer flex items-center gap-1'>
      <h4 className='text-3xl'>Resumate</h4>
<FileText size={30}  color="#7c3aed" />
</Link>
</div>

        <div className='flex gap-5'>
          <Link to="/dashboard">
        <Button variant='outline'>Get starteed</Button>
        </Link>
     
       </div>
   
      
    
    
      </div>
    </>
  )
}

export default Header
