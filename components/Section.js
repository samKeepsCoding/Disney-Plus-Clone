import React from 'react'
import Card from './Card'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';


const Section = ({genre, videos}) => {

    const slideLeft = () => {
        const slider = document.getElementById('slider')
        slider.scrollLeft = slider.scrollLeft - 500
    }

    const slideRight = () => {
        const slider = document.getElementById('slider')
        slider.scrollLeft = slider.scrollLeft + 500
    }

  return (
    <>
        <div className='relative w-full px-3'>
            <h3 className='ml-5 my-5'>{genre}</h3>
            <div className='flex items-center px-4'>
                <MdChevronLeft className='opacity-50 cursor-pointer hover:opacity-100 hidden md:block' onClick={slideLeft} size={40} color={'white'}/>

                <div id='slider' className=' w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide space-x-1' >
                    {videos.map(video => (
                        <a key={video.id} href={`/video/${video.slug}`}>
                            <Card thumbnail={video.thumbnail}/>
                        </a>
                    ))}
                </div>
                
                <MdChevronRight className='opacity-50 cursor-pointer hover:opacity-100 hidden md:block' onClick={slideRight} size={40} color={'white'}/>

            </div>
        </div>
    </>
  )
}

export default Section