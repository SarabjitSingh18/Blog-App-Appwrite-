import React from 'react'
import appwriteService from '../appwrite/config'
import { Link } from 'react-router-dom'


function PostCard({ $id, title, featuredImage }) {
    return (
        <Link to={`/post/${$id}`}>
           

           
            <div className='lg:w-full  lg:max-h-[200px] bg-gray-100 rounded-xl p-4'>
                <div className='lg:w-full justify-center mb-4 '>
                    <img src={appwriteService.getFilePreview(featuredImage)} alt={title}
                        className='rounded-xl  lg:max-h-[130px] ' />
                </div>
                <h2
                    className='text-xl font-bold'
                >{title}</h2>
            </div>
            

        </Link>
    )
}

export default PostCard
