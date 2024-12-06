import React from 'react'

export default function ReceiverMessage() {
  return (
    <div className='flex gap-3 my-2 max-w-[300px] md:w-auto'>
        <img src="/logo.png" className='h-12 w-12 rounded-full' alt="" />
        <div>
            <div className='flex gap-3'>
                <p className="font-bold">Joshua Adegbite</p>
                <small className='text-slate-400'>05:01 PM</small>
            </div>
            <p className='bg-white rounded-xl rounded-tl-none p-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos harum accusantium mollitia natus! Iste modi aperiam explicabo cumque aspernatur voluptatem.</p>
        </div>
    </div>
  )
}
