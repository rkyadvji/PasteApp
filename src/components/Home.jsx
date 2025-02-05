import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';

const Home = () => {
    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const pasteId = searchParams.get("pasteId");

    const dispatch = useDispatch();
    const allPastes = useSelector((state) => state.paste.pastes);

    useEffect(() => {
        if (!pasteId) return;

        const paste = allPastes.find((p) => p._id === pasteId);
        if (paste) {
            setTitle(paste.title);
            setValue(paste.content);
        }
    }, [pasteId, allPastes]);

    function createPaste() {
        const paste = {
            title,
            content: value,
            _id: pasteId || Date.now().toString(36),
            createdAt: new Date().toISOString(),
        };

        if (pasteId) {
            dispatch(updateToPastes(paste));
        } else {
            dispatch(addToPastes(paste));
        }

        setTitle('');
        setValue('');
        setSearchParams({});
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="w-full max-w-lg bg-white rounded-3xl shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-800 text-center">
                    {pasteId ? "Update Your Paste" : "Create a New Paste"}
                </h2>

                {/* Input Field */}
                <input
                    className="w-full mt-4 p-3 border border-gray-300 rounded-xl text-gray-900 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    type="text"
                    placeholder="Enter title here..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                {/* Textarea */}
                <textarea
                    className="w-full mt-4 p-3 border border-gray-300 rounded-xl text-gray-900 shadow-sm h-40 resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    value={value}
                    placeholder="Enter content here..."
                    onChange={(e) => setValue(e.target.value)}
                />

                {/* Button */}
                <button
                    onClick={createPaste}
                    className="w-full mt-4 p-3 text-white font-semibold bg-blue-500 hover:bg-blue-600 rounded-xl shadow-md transition-all duration-200"
                >
                    {pasteId ? "Update My Paste" : "Create My Paste"}
                </button>
            </div>
        </div>
    );
};

export default Home;
