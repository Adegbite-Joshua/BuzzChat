import React, { useState } from 'react'

export default function SenderMessage({isMessagesSelected, handleSetSelectedMessages}: {isMessagesSelected: boolean, handleSetSelectedMessages: ()=>any}){
  const [isSelected, setIsSelected] = useState(false)
  let pressTimer: any = null;

  const handleLongPressStart = () => {
    // Start the timer
    pressTimer = setTimeout(() => {
      console.log("Long Press Triggered!");
      setIsSelected(prev => !prev);
    }, 500); // 500ms threshold
  };

  const handleLongPressEnd = () => {
    // Clear the timer
    clearTimeout(pressTimer);
  };

  return (
    <div
      className='flex gap-3 ms-auto max-w-[300px] my-2 md:w-auto'
      onMouseDown={handleLongPressStart}
      onMouseUp={handleLongPressEnd}
      onMouseLeave={handleLongPressEnd}
      onTouchStart={handleLongPressStart}
      onTouchEnd={handleLongPressEnd}>
      <div>
        <div className='flex items-end justify-end gap-3'>
          <small className='text-slate-400'>05:01 PM</small>
          <p className="font-bold">You</p>
        </div>
        <p className={`${isSelected ? 'bg-yellow-300' : 'bg-blue-600'} rounded-xl rounded-tr-none p-2`}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos harum accusantium mollitia natus! Iste modi aperiam explicabo cumque aspernatur voluptatem.</p>
      </div>
      <img src="/logo.png" className='h-12 w-12 rounded-full' alt="" />
    </div>
  )
}
