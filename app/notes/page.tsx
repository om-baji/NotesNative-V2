import AppBar from '@/components/AppBar'
import React from 'react'

const page = () => {
    return (
        <div>
            <AppBar />
            <div className='flex flex-col justify-center mt-10 w-full ' >
                <div className='flex p-8 '>
                    <input className='border-none bg-inherit outline-none text-6xl font-mono w-full'
                        type="text" placeholder='Title' />
                </div>
                <div className='flex p-8'>
                    <textarea className='w-full h-96 border-none bg-inherit outline-none text-3xl font-mono'
                        placeholder='Description' />
                </div>

            </div>

        </div>
    )
}

export default page
