import { Button } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import { CallOutlined, GroupsOutlined, SettingsOutlined, EmailOutlined } from '@mui/icons-material'
import { usePathname } from 'next/navigation'
import Image from 'next/image'


export default function AuthenticatedNavbar() {
  const activePath = usePathname();

  return (
    <nav className='hidden md:block md:basis-2/12 border-r border-slate-200 p-3'>
      <div className='h-24'>
        <Button className='text-blue-600 font-bold text-xl items-center' startIcon={
          <Image src={'/logo-t.png'} alt='Logo' height={100} width={100} />
        }>BUZZCHAT</Button>
      </div>
      <hr />
      <Link href={'/messages'} className={`flex items-center justify-start gap-3 p-2 my-2 ${activePath == '/messages' ? 'bg-blue-600 text-white rounded-lg text-sm' : 'text-slate-400'}`}><EmailOutlined fontSize='medium' /> <span>Messages</span></Link>
      <Link href={'/groups'} className={`flex items-center justify-start gap-3 p-2 my-2 ${activePath == '/groups' ? 'bg-blue-600 text-white rounded-lg text-sm' : 'text-slate-400'}`}><GroupsOutlined fontSize='medium' /> <span>Groups</span></Link>
      <Link href={'/settings'} className={`flex items-center justify-start gap-3 p-2 my-2 ${activePath == '' ? 'bg-blue-600 text-white rounded-lg text-sm' : 'text-slate-400'}`}><SettingsOutlined fontSize='medium' /> <span>Settings</span></Link>
      <Link href={'/calls'} className={`flex items-center justify-start gap-3 p-2 my-2 ${activePath == '/calls' ? 'bg-blue-600 text-white rounded-lg text-sm' : 'text-slate-400'}`}><CallOutlined fontSize='medium' /> <span>Calls</span></Link>
      <Link href={'/'} className={`flex items-center justify-start gap-3 p-2 my-2 ${activePath == '' ? 'bg-blue-600 text-white rounded-lg text-sm' : 'text-slate-400'}`}><EmailOutlined fontSize='medium' /> <span>Messages</span></Link>
      <Link href={'/'} className={`flex items-center justify-start gap-3 p-2 my-2 ${activePath == '' ? 'bg-blue-600 text-white rounded-lg text-sm' : 'text-slate-400'}`}><EmailOutlined fontSize='medium' /> <span>Messages</span></Link>
      <Link href={'/'} className={`flex items-center justify-start gap-3 p-2 my-2 ${activePath == '' ? 'bg-blue-600 text-white rounded-lg text-sm' : 'text-slate-400'}`}><EmailOutlined fontSize='medium' /> <span>Messages</span></Link>
    </nav>
  )
}
