"use client"
import { setNotes } from '@/actions/notes';
import AppBar from '@/components/AppBar';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { UserSession } from '@/actions/notes';
import { AuthStatus } from '@/actions/notes';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const Page = () => {

    const [title, setTitle] = useState("");
    const [description, setDesc] = useState("");
    const { data: session, status } = useSession();
    const router = useRouter()

    const onSave = async () => {

        const data = {
            title,
            description,
            session: session as UserSession,
            status: status as AuthStatus
        }
        try {
            const note = await setNotes(data)

            console.log(note)
            toast.success("Created Successfully!", {
                duration : 4000
            })
            router.push("/notes")

        } catch (error) {
            toast.error("Something went wrong", {
                duration : 4000
            })
            console.log(error)
        }

    }

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col">
            <AppBar />
            <div className="flex flex-col justify-center mt-10 w-full max-w-full mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex mb-6">
                    <input
                        onChange={e => setTitle(e.target.value)}
                        className="bg-white/10 backdrop-blur-md outline-none text-5xl font-mono w-full p-4 rounded-lg shadow-md text-white placeholder-gray-400 border border-white/20 focus:ring-2 focus:ring-blue-500 transition"
                        type="text"
                        placeholder='Title'
                    />
                </div>
                <div className="flex">
                    <textarea
                        onChange={e => setDesc(e.target.value)}
                        className="w-full h-96 bg-white/10 backdrop-blur-md outline-none text-lg font-mono p-4 rounded-lg shadow-md text-white placeholder-gray-400 border border-white/20 focus:ring-2 focus:ring-blue-500 transition resize-none"
                        placeholder='Description'
                    />
                </div>
            </div>
            <div className='flex justify-center'>
                <button onClick={onSave}
                    className="mt-4 px-4 py-2 bg-green-600/70 text-white rounded-lg hover:bg-green-500/80 transition">
                    Save
                </button>
            </div>

        </div>
    );
};

export default Page;
