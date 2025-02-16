import React, { useState } from 'react';
import { useAuthStore } from '../stote/useAuthStore';
import { LogOut } from 'lucide-react';

const UserNotes = () => {
    const { authUser, notes, gettingNotes } = useAuthStore();
    const profileName = authUser?.username?.charAt(0).toUpperCase() || "?";
    const [search, setSearch] = useState("");


    return (
        <div className='w-[35%] bg-black border-r border-gray-400'>
            <div>
                <div className='flex gap-2 justify-between p-8 items-center border-b border-gray-400 montserrat shadow-white'>
                    <div className='flex gap-2 items-center'>
                        <div className='bg-purple-400 flex items-center justify-center rounded-full text-white w-10 h-10'>
                            {profileName}
                        </div>
                        <div>{authUser?.username || "Guest"}</div>
                    </div>
                    <div className='text-error hover:scale-105 duration-150 ease-in-out cursor-pointer'>
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

                <div>
                    {notes}
                </div>
            </div>
        </div>
    );
};

export default UserNotes;
