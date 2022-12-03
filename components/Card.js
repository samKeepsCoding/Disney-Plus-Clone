import React from 'react'

const Card = ({thumbnail}) => {
    
  return (
    

        <div className='relative h-full ml-2 inline-block cursor-pointer  hover:scale-105 ease-in-out duration-300'>
            <img
            src={thumbnail.url}
            alt={thumbnail.title}
            className='rounded-lg m-[5px] w-[150px] md:w-[250px] h-48 drop-shadow-md'
        
            />
        </div>
    
    
    
  )
}

export default Card