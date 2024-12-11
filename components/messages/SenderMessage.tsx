import React, { useRef, useState } from 'react'

export default function SenderMessage({ isMessagesSelected, handleSetSelectedMessages, selectedMessages, messageId }: { isMessagesSelected: boolean, handleSetSelectedMessages: (messageId:  string) => any, selectedMessages: string[], messageId: string }) {
  const isSelected = selectedMessages.includes(messageId);

  let pressTimer: any = null;  

  const handleLongPressStart = () => {
    pressTimer = setTimeout(() => {
      console.log("Long Press Triggered!");
      handleSetSelectedMessages(messageId);
    }, 500);
  };

  const handleLongPressEnd = () => {
    if(!pressTimer) return;
    clearTimeout(pressTimer);
  };


  const handleClick = () => {
    handleSetSelectedMessages(messageId);
  };
  return (
    <div
      className='flex gap-3 ms-auto max-w-[300px] my-2 md:w-auto'
      onMouseDown={!isMessagesSelected ? handleLongPressStart : undefined}
      onMouseUp={!isMessagesSelected ? handleLongPressEnd : undefined}
      onMouseLeave={!isMessagesSelected ? handleLongPressEnd : undefined}
      onTouchStart={!isMessagesSelected ? handleLongPressStart : undefined}
      onTouchEnd={!isMessagesSelected ? handleLongPressEnd : undefined}
    onClick={isMessagesSelected ? handleClick : undefined}
    >
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
