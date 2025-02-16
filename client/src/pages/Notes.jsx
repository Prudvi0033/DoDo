import React from 'react'
import CreateNotes from '../components/CreateNotes'
import UserNotes from '../components/UserNotes'

const Notes = () => {
  return (
    <div className='flex h-screen'>
      <UserNotes/>
      <CreateNotes/>
    </div>
  )
}

export default Notes