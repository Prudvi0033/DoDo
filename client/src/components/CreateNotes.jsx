import React from 'react'

const CreateNotes = ({selectedNote}) => {
  return (
    <div className='w-[65%] bg-black'>
        {
          selectedNote ? (
            <div>
              <h1>{selectedNote.title}</h1>
              <p>{selectedNote.content}</p>
            </div>
          ) :
          (
            <p>Select a notes to view its content or Create one</p>
          )
        }
    </div>
  )
}

export default CreateNotes