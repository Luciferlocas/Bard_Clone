import React from 'react'

const Chat = () => {
  return (
    <div className='bg-zinc-900 flex-1 px-4 py-6'>
        <div className='flex justify-between'>
            <p className='text-3xl bg-gradient-to-r from-blue-600 to-red-400 bg-clip-text text-transparent'>Bard</p>
            <img src="/Icon.ico" alt="" />
        </div>
        <div>
            <p>Hello, Rohit</p>
            <p>How can I help you today?</p>
        </div>
    </div>
  )
}

export default Chat
