import React from 'react'

export default function Feature({icon, title, text}: {icon: React.ReactNode, title: string, text: string}) {
  return (
    <div className='p-10 bg-slate-200 flex flex-col justify-center group hover:bg-blue-600 hover:text-white duration-500 ease-in-out rounded-xl'>
        <div className='bg-white p-3 mx-auto rounded-full w-14 h-14 flex justify-center items-center text-blue-600'>
            {React.cloneElement(icon as React.ReactElement, { className: "w-6 h-6 text-blue-600", fontSize: 'large' })}
        </div>
        <p className="text-xl text-black font-bold group-hover:text-white">{title}</p>
        <p className='text-slate-400 group-hover:text-white'>{text}</p>
    </div>
  )
}
