import React,{useState, useEffect, useRef} from 'react'
import { gql, GraphQLClient } from 'graphql-request'
import useVideoPlayer from '../../hooks/useVideoPlayer'
import { BsFillPlayFill } from 'react-icons/bs'
import { BsPauseFill } from 'react-icons/bs'
import { GoUnmute  } from 'react-icons/go'
import { GoMute } from 'react-icons/go'
import { IoArrowBackOutline } from 'react-icons/io5'




export const getServerSideProps = async (pageContext) => {
    const url = process.env.URL_ENDPOINT
    const graphQLClient = new GraphQLClient(url, {
        headers: {
            'Authorization' : process.env.GRAPH_CMS_TOKEN 
        }
    })

   const pageSlug = pageContext.query.slug

   const query = gql`
    query MyQuery($pageSlug: String!) {
        video(where: {
            slug: $pageSlug
        }) {
        description
        id
        mp4 {
            url
            id
        }
        slug
        tags
        thumbnail {
            url
        }
        seen
        title
        }
    }
   `

   const variables = {
        pageSlug,
   }

   const data = await graphQLClient.request(query, variables)
   const video = data.video

   return {
    props: {
        video
    }
   }
}

const changeToSeen = async (slug) => {
    await fetch('/api/changeToSeen', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ slug })
    })
}

const Video = ({video}) => {
    
    const videoElement = useRef(null)
    const {
        playerState,
        togglePlay,
        handleOnTimeUpdate,
        handleVideoProgress,
        handleVideoSpeed,
        toggleMute,
    } = useVideoPlayer(videoElement)
     
      
    
  return (
    <div className='bg-slate-900 h-screen w-screen flex justify-center items-center'>
        {!playerState.isPlaying ? (
            <div className='absolute w-full top-10 flex justify-center items-center'>
                <h3 className=' text-white'>{video.title}</h3>
            </div>
        ): null}
        <video 
            src={video.mp4.url}
            ref={videoElement}
            OnTimeUpdate={handleOnTimeUpdate}
            onClick={togglePlay}
            className='h-full w-full cursor-pointer'
        />
        <div className='absolute bottom-3 flex flex-row justify-evenly items-center bg-[#1E2841] w-full max-w-[500px] h-20 px-4 rounded-sm'>

            <div className='flex flex-row space-x-4 justify-center items-center'>
                <button onClick={togglePlay}>
                    {!playerState.isPlaying ? (
                        <BsFillPlayFill 
                            size={40}
                            className='fill-slate-50 cursor-pointer hover:scale-125 hover:ease-in duration-100 ease-out' 
                        
                        />

                    ): (
                        <BsPauseFill
                            size={40}
                            className='fill-slate-50 cursor-pointer hover:scale-125 hover:ease-in duration-100 ease-out' 
                        
                        />
                    )}
                </button>
            </div>
            <input
                type="range"
                min="0"
                max="100"
                value={playerState.progress}
                onChange={(e) => handleVideoProgress(e)}
                className= 'relative top-0 z-10 w-full rounded-lg'
            />
            <select
                className="appearance-none text-white outline-none border-none text-center text-lg font-light cursor-pointer hover:scale-125 ease-in duration-150 ml-4" 
                style={{background: 'none'}}
                id='#speed'
                value={playerState.speed}
                onChange={(e) => handleVideoSpeed(e)}
            >
                <option value="0.50">0.50x</option>
                <option value="1">1x</option>
                <option value="1.25">1.25x</option>
                <option value="2">2x</option>
            </select>

            <button onClick={toggleMute}>
                    {!playerState.isMuted ? (
                        <GoUnmute
                            size={25}
                            className='fill-slate-50 cursor-pointer hover:scale-125 hover:ease-in duration-100 ease-out' 
                        
                        />

                    ): (
                        <GoMute
                            size={25}
                            className='fill-slate-50 cursor-pointer hover:scale-125 hover:ease-in duration-100 ease-out' 
                        
                        />
                    )}
                </button>
        </div>
        <a href='/' className='absolute top-10 left-10 text-white'>
            <IoArrowBackOutline
                size={40}
            />
        </a>
    </div>
  )
}

export default Video