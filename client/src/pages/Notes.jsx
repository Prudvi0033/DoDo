import React, { useState } from 'react'
import CreateNotes from '../components/CreateNotes'
import UserNotes from '../components/UserNotes'

const Notes = () => {
  const [selectedNote, setSelectedNote] = useState(null);


    return (
        <div className='flex h-screen'>
            <UserNotes selectedNote={selectedNote} setSelectedNote={setSelectedNote} />
            <CreateNotes selectedNote={selectedNote} />
        </div>
    );
}

export default Notes