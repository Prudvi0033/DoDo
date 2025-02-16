import { Notebook, PenTool, Sparkles, Trash } from 'lucide-react'
import React from 'react'

const CreateNotes = ({ selectedNote }) => {
  return (
    <div className='w-[65%] bg-black montserrat'>
      {
        selectedNote ? (
          <div>
            <div className='flex justify-between items-center border-b'>
              <div className='flex items-center gap-2 '>
                <span className='ml-2'></span>
                <h1 className='text-2xl p-5 text-white'>{selectedNote.title}</h1>
              </div>
              <div className='px-4 flex gap-4'>
                <button className='btn glass text-white bg-zinc-950'>Improve <Sparkles /></button>
                <button className='btn glass text-white bg-purple-600'>Summarize <Notebook /></button>
              </div>
            </div>

            <div className='p-4'>
              <div className='bg-zinc-800 rounded-lg h-[530px] overflow-hidden'>
                <p className='p-6 text-lg'>{selectedNote.content}</p>
              </div>
              <div className='flex  mt-2 items-center justify-center gap-3'>
                <button className='btn glass bg-blue-800 text-white'>Edit <PenTool/></button>
                <button className='btn glass bg-error text-white'>Delete <Trash /></button>
              </div>
            </div>
          </div>
        ) :
          (
            <div className='flex items-center justify-center h-screen'>
              <p className='text-center'>Select a notes to view its content or Create one</p>
            </div>
          )
      }
    </div>
  )
}

export default CreateNotes