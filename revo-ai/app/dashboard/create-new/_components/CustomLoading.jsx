import React from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Image from 'next/image'

function CustomLoading({loading}) {
  return (
    <AlertDialog open={loading}>
  <AlertDialogContent>
    <div className='flex flex-col items-center my-10 justify-center'>
        <Image src={'/download.gif'} width={100} height={100}/>
        <h2>Generating.....</h2>
        <h6 className='text-violet-600'>Do Not Refresh</h6> 
    </div>
  </AlertDialogContent>
</AlertDialog>
  )
}

export default CustomLoading
