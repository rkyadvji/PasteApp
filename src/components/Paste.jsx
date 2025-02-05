import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) => 
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
    toast.success("Paste deleted successfully");
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <input 
        className='p-3 rounded-xl w-full bg-gray-100 text-gray-900 border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none' 
        type='search' 
        placeholder='Search pastes...' 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
      />

      <div className='mt-6 space-y-4'>
        {filteredData.length > 0 ? (
          filteredData.map((paste) => (
            <div key={paste?._id} className='bg-white shadow-md rounded-xl p-5 border border-gray-200'>
              <div className='text-lg font-semibold text-gray-900'>{paste.title}</div>
              <div className='text-gray-700 mt-2 truncate'>{paste.content}</div>
              <div className='text-sm text-gray-500 mt-2'>{new Date(paste.createdAt).toLocaleString()}</div>
              
              <div className='flex items-center gap-3 mt-4'>
                <Link 
                  to={`/?pasteId=${paste?._id}`} 
                  className='px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600 transition-all'
                >
                  Edit
                </Link>
                <Link 
                  to={`/pastes/${paste?._id}`} 
                  className='px-4 py-2 bg-orange-500 text-black rounded-lg hover:bg-orange-600 transition-all'
                >
                  View
                </Link>
                <button 
                  onClick={() => handleDelete(paste?._id)} 
                  className='px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all'
                >
                  Delete
                </button>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(paste?.content);
                    toast.success("Copied to clipboard");
                  }} 
                  className='px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all'
                >
                  Copy
                </button>
                <button 
                  onClick={() => {
                    const shareUrl = `${window.location.origin}/pastes/${paste?._id}`;
                    navigator.clipboard.writeText(shareUrl);
                    toast.success("Paste link copied to clipboard!");
                  }}
                  className='px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-all'
                >
                  Share
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className='text-gray-500 text-center mt-4'>No pastes found.</p>
        )}
      </div>
    </div>
  );
};

export default Paste;
