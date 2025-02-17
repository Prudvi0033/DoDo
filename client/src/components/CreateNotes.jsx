import { Trash } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { useNoteStore } from '../stote/useNoteStore';
import { useAuthStore } from '../stote/useAuthStore';


const CreateNotes = ({ selectedNote }) => {

  const { deleteNotes } = useNoteStore()
  const { fetchNotes } = useAuthStore()
  const [loading, setLoading] = useState(false)


  const handleDelete = async () => {
    if (!selectedNote._id) return;

    try {
      setLoading(true)
      await deleteNotes(selectedNote._id)
      await fetchNotes()
      useNoteStore.setState({ selectedNote: null })
    } catch (error) {
      console.log("Error in deleting");
    } finally {
      setLoading(false)
    }
  }

  



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
              <div className='flex  mt-2 items-center justify-center ml-6'>
                <button className='btn glass bg-error text-white' disabled={loading} onClick={handleDelete}>Delete <Trash /></button>
              </div>
            </div>

            <div className='p-4'>
              <div className='bg-zinc-800 rounded-lg h-[530px] overflow-hidden'>
                <p className='p-6 text-lg'><ReactMarkdown rehypePlugins={rehypeRaw}>{selectedNote.content ? selectedNote.content.replace(/\n/g, "  \n") : "No content available"}</ReactMarkdown></p>
              </div>
            </div>
          </div>
        ) :
          (
            <div className='flex flex-col gap-3 items-center justify-center h-screen'>
              <p className='text-center text-3xl'>Select a notes to view its content or Create one</p>
              <p className='font-semibold text-xl'>Refresh Page if notes aren't visible and after deletion</p>
            </div>
          )
      }
    </div>
  )
}

export default CreateNotes