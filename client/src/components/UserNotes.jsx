import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../stote/useAuthStore';
import { CirclePlus, LogOut } from 'lucide-react';
import GenerateNote from './GenerateNote';

const UserNotes = ({ selectedNote, setSelectedNote }) => {
    const { authUser, notes, gettingNotes, fetchNotes, logout } = useAuthStore();
    const profileName = authUser?.username?.charAt(0).toUpperCase() || "?";
    const [search, setSearch] = useState("");
    const [isCreateNoteOpen, setIsCreateNoteOpen] = useState(false);

    useEffect(() => {
        fetchNotes(search);
    }, [search, fetchNotes]);

    return (
        <div className='w-[35%] bg-black border-r border-gray-400 h-screen overflow-hidden montserrat'>
            <div>
                <div className='flex gap-2 justify-between p-8 items-center border-b border-gray-400 montserrat shadow-white'>
                    <div className='flex gap-2 items-center'>
                        <div className='bg-purple-400 flex items-center justify-center rounded-full text-white w-10 h-10'>
                            {profileName}
                        </div>
                        <div>{authUser?.username || "Guest"}</div>
                    </div>
                    <div
                        className='text-error hover:scale-105 duration-150 ease-in-out cursor-pointer'
                        onClick={logout}
                    >
                        <LogOut />
                    </div>
                </div>

                <div className='p-2'>
                    <label className="input input-bordered flex items-center bg-zinc-800 gap-2">
                        <input
                            type="text"
                            className="grow"
                            placeholder="Search Here.."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <kbd className="kbd kbd-sm">⌘</kbd>
                        <kbd className="kbd kbd-sm">K</kbd>
                    </label>
                </div>

                <div className="p-2 h-[33rem] overflow-y-auto">
                    {gettingNotes ? (
                        <p className="text-gray-300 text-center">Loading Notes...</p>
                    ) : notes.length > 0 ? (
                        <ul className="text-white space-y-2">
                            {notes.map((note) => (
                                <li
                                    key={note._id}
                                    className={`p-3 cursor-pointer border-b border-gray-400 ${ selectedNote?._id === note?._id ? 'bg-zinc-800' : ''}`}
                                    onClick={() => setSelectedNote(note)}
                                >
                                    <h3 className="font-bold truncate">{note.title || "Untitled Note"}</h3>
                                    
                                    <p className="text-gray-400 truncate">
                                        {note.content || "No content available"}
                                    </p>

                                    <p className='mt-2 text-gray-400 text-[10px]'>
                                        {new Date(note.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-300 text-center">No Notes Found</p>
                    )}
                </div>

                <div className='flex items-center justify-center w-full p-8'>
                    <button
                        onClick={() => setIsCreateNoteOpen(true)}
                        className={`relative z-10 w-full -top-24 btn text-white text-lg bg-purple-600 glass`}
                    >
                        <CirclePlus />Create Notes
                    </button>
                </div>
            </div>

            {isCreateNoteOpen && <GenerateNote isOpen={isCreateNoteOpen} onClose={() => setIsCreateNoteOpen(false)} />}
        </div>
    );
};

export default UserNotes;
