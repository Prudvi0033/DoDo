import { Notebook, Trash, ArrowLeft } from 'lucide-react';  // Added ArrowLeft for the back button
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { useNoteStore } from '../stote/useNoteStore';
import { useAuthStore } from '../stote/useAuthStore';
import axios from 'axios';
import { axiosInstance } from '../lib/axios';

const CreateNotes = ({ selectedNote }) => {
  const { deleteNotes } = useNoteStore();
  const { fetchNotes } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [summarizedText, setSummarizedText] = useState('');
  const [showSummaryPopup, setShowSummaryPopup] = useState(false);

  const handleDelete = async () => {
    if (!selectedNote._id) return;

    try {
      setLoading(true);
      await deleteNotes(selectedNote._id);
      await fetchNotes();
      useNoteStore.setState({ selectedNote: null });
    } catch (error) {
      console.log('Error in deleting');
    } finally {
      setLoading(false);
    }
  };

  const handleSummarize = async () => {
    if (!selectedNote._id) return;

    try {
      setLoading(true);
      const response = await axiosInstance.post('/user/notes/summarize', { content: selectedNote.content });
      setSummarizedText(response.data.summary);
      setShowSummaryPopup(true);
    } catch (error) {
      console.log('Error summarizing note:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(summarizedText);
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className='w-full lg:w-[65%] bg-black montserrat'>
      {selectedNote ? (
        <div>
          <div className='flex justify-between items-center border-b'>
            <div className='flex items-center gap-2'>
              <button onClick={handleBack} className='btn glass text-white bg-gray-600'>
                <ArrowLeft />
              </button>
              <h1 className='text-2xl p-5 text-white'>{selectedNote.title}</h1>
            </div>
            <div className='lg:flex grid gap-3 mt-2 items-center justify-center ml-6'>
              <button className='btn glass text-white bg-purple-600' onClick={handleSummarize}>
                Summarize <Notebook />
              </button>
              <button className='btn glass bg-error text-white' disabled={loading} onClick={handleDelete}>
                Delete <Trash />
              </button>
            </div>
          </div>

          <div className='p-4'>
            <div className='bg-zinc-800 rounded-lg h-screen lg:h-[530px] sm:h-auto overflow-hidden'>
              <ReactMarkdown className='p-6 text-lg' rehypePlugins={[rehypeRaw]}>
                {selectedNote.content ? selectedNote.content.replace(/\n/g, '  \n') : 'No content available'}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      ) : (
        <div className='flex flex-col gap-3 items-center justify-center h-screen'>
          <p className='text-center text-sm lg:text-3xl'>Select a note to view its content or Create one</p>
          <p className='font-semibold text-sm lg:text-xl'>Refresh Page if notes aren't visible and after deletion</p>
        </div>
      )}

      {showSummaryPopup && (
        <div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50'>
          <div className='bg-black p-6 rounded-md w-3/4 max-w-lg'>
            <h2 className='text-2xl mb-4'>Summarized Content</h2>
            <p className='text-lg'>{summarizedText}</p>
            <div className='flex justify-between'>
              <button className='mt-4 btn glass text-white bg-blue-500' onClick={handleCopy}>
                Copy to Clipboard
              </button>
              <button className='mt-4 btn glass text-white bg-error' onClick={() => setShowSummaryPopup(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateNotes;
