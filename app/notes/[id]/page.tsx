"use client"
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getNote, updateNote } from '@/actions/notes';
import AppBar from '@/components/AppBar';
import { noteType } from '@/utils/types';
import toast from 'react-hot-toast';

const Page = () => {
    const params = useParams();
    const { id } = params;
    const [note, setNote] = useState<noteType>();
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    const onEdit = async () => {
        try {
            const { success } = await updateNote(id as string, note?.title as string, note?.description as string);
            if (success) {
                setIsEditing(!isEditing);
                toast.success("Note updated!", {
                    duration: 4000
                });
            }
            if (!success) throw new Error("Failed!");
        } catch (error) {
            toast.error("Update failed", {
                duration: 4000
            });

            console.log(error)
        }
    };

    useEffect(() => {
        const getData = async () => {
            const data = await getNote(id as string);
            //@ts-expect-error
            setNote(data?.note);
            setLoading(false);
        };
        getData();
    }, [id, isEditing]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                Loading...
            </div>
        );
    }

    return (
        <div>
            <AppBar />
            <div className="grid grid-cols-1 lg:grid-cols-[70%_30%] h-screen">
                <div className="bg-[#1a1f2b] text-white p-4 sm:p-6 flex flex-col gap-4">
                    <input
                        placeholder='Title'
                        type="text"
                        value={note?.title || ''}
                        disabled={!isEditing}
                        className={`text-3xl sm:text-4xl font-bold text-[#82aaff] bg-transparent border-none outline-none ${
                            isEditing ? 'border-b-2 border-[#82aaff] mb-4' : ''
                        }`}
                        onChange={(e) =>
                            setNote((prev) => ({ ...prev, title: e.target.value } as noteType))
                        }
                    />
                    <textarea
                        placeholder='Description'
                        value={note?.description || ''}
                        disabled={!isEditing}
                        className={`text-md sm:text-lg text-[#c3c9d9] h-40 sm:h-96 bg-transparent border-none outline-none resize-none ${
                            isEditing ? 'border-b-2 border-[#82aaff]' : ''
                        }`}
                        onChange={(e) =>
                            setNote((prev) => ({ ...prev, description: e.target.value } as noteType))
                        }
                    />
                    {isEditing && (
                        <button
                            onClick={onEdit}
                            className="p-2 bg-blue-500 rounded-lg mt-4"
                        >
                            Save
                        </button>
                    )}
                </div>
                <div className="bg-[#1e293b] text-white p-4 sm:p-6">
                    <div className="text-lg sm:text-2xl font-semibold text-[#82aaff]">
                        User ID: {note?.userId}
                    </div>
                    <div className="text-sm sm:text-md text-[#a0aec0] mt-4">
                        Created At: {note?.createdAt ? new Date(note.createdAt).toLocaleString() : 'N/A'}
                    </div>
                    <div className="text-sm sm:text-md text-[#a0aec0] mt-2">
                        Updated At: {note?.updatedAt ? new Date(note.updatedAt).toLocaleString() : 'N/A'}
                    </div>
                    <div>
                        <button
                            className="p-2 bg-green-500 rounded-lg mt-6 w-full"
                            onClick={() => setIsEditing(!isEditing)}
                        >
                            {isEditing ? 'Cancel' : 'Edit'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
