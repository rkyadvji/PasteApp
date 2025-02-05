
import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToPastes, updateToPastes } from '../redux/pasteSlice'; 

const ViewPaste = () => {
   
  const {id} = useParams();

  const allPastes = useSelector((state)=>state.paste.pastes);
  
  const paste = allPastes.filter((p)=>p._id ===id)[0];
  console.log("Final Paste: ", paste);

  return (
    <div>
      <div className='flex flex-row gap-7 place-content-between'>
      <input className='p-1 rounded-2xl mt-2 bg-white text-black w-[53%] pl-4'
      type='text'
      placeholder='enter text here'
      value={paste.title}
      disabled
      onChange={(e)=>setTitle(e.target.value)}
      />

      {/* <button onClick={createPaste}
       className='p-2 rounded-2xl mt-2 '>
        {
          pasteId ? "Update My Paste": "Create My Paste"
        }
      </button> */}
    </div>

    <div className='mt-8'>
        <textarea className='p-4 rounded-2xl mt-4 min-w-[500px] bg-white text-black'
        value={paste.content}
        placeholder='enter content here'
        disabled
        onChange={(e)=>setValue(e.target.value)}
        rows={20}
        />
    </div>

    </div>
  )
}

export default ViewPaste
