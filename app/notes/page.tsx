"use client"
import { getNotes, UserSession } from '@/actions/notes'
import AppBar from '@/components/AppBar'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { noteType } from '@/utils/types'


const NotesPage = () => {
    const { data: session, status } = useSession();
    const [notes, setNotes] = useState<noteType[]>([]);
    const [loading, setLoading] = useState(true);

    const router = useRouter();

    useEffect(() => {
        const getData = async () => {
            if (session && status === "authenticated") {
                try {
                    const res = await getNotes(session as UserSession, status);

                    if (res.notes && res.notes.length > 0) {
                        //@ts-expect-error
                        setNotes(res.notes);
                        setLoading(false);
                    } else {
                        setLoading(true);
                    }

                } catch (error) {
                    console.error("Failed to fetch notes:", error);
                    toast.error("Error fetching notes!", {
                        duration : 4000
                    })
                    setLoading(true);
                }
            }
        };

        if (status !== "loading") {
            getData();
        }
    }, [status, session]);

    return (
        <div className="bg-gray-900 min-h-screen text-white">
            <AppBar />
            <div className='container mx-auto p-4 sm:p-6'>
                <div className='flex justify-center items-center h-full'>
                    {loading && (
                        <div className='text-center'>
                            <h2 className='text-2xl sm:text-3xl mb-4'>You do not have any saved notes!</h2>
                            <div className='flex flex-col items-center'>
                                <span className='text-md sm:text-lg mb-2'>Create one now</span>
                                <button
                                    onClick={() => router.push("/notes/create")}
                                    className='bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-300 ease-in-out'
                                >
                                    Create
                                </button>
                            </div>
                        </div>
                    )}
                    {!loading && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full">
                            {notes.map((note) => (
                                <div
                                    onClick={() => {
                                        router.push(`/notes/${note.id}`)
                                    }}
                                    key={note.id}
                                    className="bg-gray-800 p-4 rounded-lg shadow-lg transition transform hover:scale-105 hover:shadow-xl"
                                >
                                    <h3 className="text-lg sm:text-xl font-bold mb-2">{note.title}</h3>
                                    <p className="mb-4 text-gray-400">{note.description.slice(0, 300)}........</p>
                                    <div className="text-sm text-gray-500">
                                        <p>Created: {new Date(note.createdAt).toLocaleDateString()}</p>
                                        <p>Updated: {new Date(note.updatedAt).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default NotesPage;
