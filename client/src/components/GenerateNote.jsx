import React, { useState } from 'react';
import { useNoteStore } from '../stote/useNoteStore';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import { X } from 'lucide-react';

const CreateNoteModal = ({ isOpen, onClose }) => {
    const { createNotes } = useNoteStore();
    const [title, setTitle] = useState('');
    
    const editor = useEditor({
        extensions: [
            StarterKit,
            Bold,
            Italic,
            TextStyle,
            Color
        ],
        content: '',
        autofocus: 'start', 
    });

    const handleSubmit = async () => {
        const content = editor?.getHTML();
        if (!title.trim() || !content.trim()) return;
    
        await createNotes({ title, content });
    
        // Update local state (ensure notes refresh immediately)
        useNoteStore.setState((state) => ({
            notes: [...state.notes, { title, content }],
        }));
    
        setTitle('');
        editor?.commands.clearContent();
        onClose(); // Close modal after saving
    };
    

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end items-center z-20">
            <div className="bg-black p-6 rounded-lg w-[65%] h-full relative shadow-lg overflow-y-auto">
                <button className="absolute top-2 right-2" onClick={onClose}><X /></button>
                <h2 className="text-xl font-bold mb-4">Create a New Note</h2>
                <input 
                    type="text" 
                    className="w-full rounded-lg input bg-zinc-900 p-2 mb-4 text-white focus:outline-none" 
                    placeholder="Title" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)}
                />
                <div className="border rounded-lg p-2 h-[480px] text-white overflow-y-auto">
                    <div className="flex items-center justify-end gap-2 mb-2 border-b p-2">
                        <button className="btn bg-purple-500 text-white font-extrabold rounded" onClick={() => editor.chain().focus().toggleBold().run()}>B</button>
                        <button className="btn bg-purple-700 px-5 text-white font-semibold rounded" onClick={() => editor.chain().focus().toggleItalic().run()}><i>i</i></button>
                        <input type="color" className="w-12 rounded-lg bg-black h-[52px]" onChange={(e) => editor.chain().focus().setColor(e.target.value).run()} />
                    </div>
                    {/* Editor Content - Remove box styling */}
                    <EditorContent 
                        className="outline-none border-none bg-transparent text-white focus:ring-0 focus:outline-none p-2 min-h-[400px]" 
                        editor={editor} 
                    />
                </div>
                <button 
                    className="mt-4 bg-purple-600 text-xl text-white btn glass px-4 py-2 rounded w-full"
                    onClick={handleSubmit}
                >Save Note</button>
            </div>
        </div>
    );
};

export default CreateNoteModal;
