import React from 'react'
import { useState } from 'react'
import { PlusSquare } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"




const AddResume = () => {
    const [open, setOpen] = useState(false)
  return (
    <div>
      <div className='flex flex-col items-center justify-center  border-2 border-dashed bg-gray-100 border-gray-200 rounded-lg px-2 cursor-pointer w-70 h-[350px] transition-all hover:scale-105 hover:shadow-lg' onClick={()=> setOpen(true)}>
        <PlusSquare className='text-gray-500' size={50} />
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
  
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Create New Resume</DialogTitle>
      <DialogDescription>
      <Input className ='my-3' placeholder='e.g, Marketing strategist'/>
      </DialogDescription>
      <div className='flex items-center justify-end gap-5'>
        <Button className='cursor-pointer' variant='ghost' onClick={()=>setOpen(false)}>Cancel</Button>
      
      <Link to="/dashboard/select-template">
         <Button className='cursor-pointer bg-purple-600'>Create</Button>
      </Link>            
      </div>
    </DialogHeader>
  </DialogContent>
</Dialog>

    </div>
  )
}

export default AddResume
