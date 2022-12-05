import Head from 'next/head'
import Image from 'next/image'
import { gql, GraphQLClient } from 'graphql-request'
import Section from '../components/Section'
import NavBar from '../components/NavBar'
import Link from 'next/link'

import disneyLogo from '../styles/assets/disney-button.png'
import pixar from '../styles/assets/pixar.png'
import marvel from '../styles/assets/marvel-button.png'
import natGeo from '../styles/assets/natgeo-button.png'
import starWars from '../styles/assets/star-wars-button.png'

const url = process.env.URL_ENDPOINT

const token = process.env.GRAPH_CMS_TOKEN

export const getStaticProps = async () => {

  const graphQLClient = new GraphQLClient(url, {
    headers: {
      "Authorization" : token
    }
  })  


  const query = gql`
    query MyQuery {
      videos {
        mp4 {
          id
          url
        }
        slug
        tags
        thumbnail {
          id
          url
        }
        title
        updatedAt
        description
        id
      }
    }
  `

  const accountQuery = gql`
    query MyQuery {
      account(where: {id: "clayz8qmsutmd0binnn45uq26"}) {
        avatar {
          url
        }
        username
      }
    }
  `

  const data = await graphQLClient.request(query)
  const videos = data.videos
  const accountData = await graphQLClient.request(accountQuery)
  const account = accountData.account

 

  return {
    props: {
      videos,
      account
    }
  }
}


export default function Home({videos, account}) {


  const randomVideo = (videos) => {
    return videos[Math.floor(Math.random() * videos.length)]
  }

  const unSeenVideos = (videos) => {
    return videos.filter(video => video.seen == 'false' || video.seen == null)
  }

  const filteredVideos = (videos, genre) => {
    return videos.filter(video => video.tags.includes(genre))
  }

  return (
    <>
      <NavBar account={account}/>
      <div className='absolute top-0 w-full bg-slate-900 text-white'>
        <div 
          className='relative w-full h-[35vh] md:h-[45vh] overflow-hidden mb-[50px] '
          // style={{backgroundImage: `url(${randomVideo(videos).thumbnail.url})`}}
        >
          <img 
            src={randomVideo(videos).thumbnail.url}
            alt={randomVideo(videos).title}
            className='w-full'
          />
        </div>

        <div className='flex flex-row w-full px-5'>

          <Link href='#disney'>
            <div className='bg-[#1E2841] rounded-md m-[5px]' id='disney'>
              <Image
                src={disneyLogo}
                alt='Video'
                width='auto'
                height='auto'
              />
            </div>
          </Link>

          <Link href='#pixar'>
            <div className='bg-[#1E2841] rounded-md m-[5px]' id='pixar'>
              <Image
                src={pixar}
                alt='Video'
                width='auto'
                height='auto'
              />
            </div>
          </Link>

          <Link href='#marvel'>
            <div className='bg-[#1E2841] rounded-md m-[5px]' id='marvel'>
              <Image
                src={marvel}
                alt='Video'
                width='auto'
                height='auto'
              />
            </div>
          </Link>
          <Link href='#natGeo'>
            <div className='bg-[#1E2841] rounded-md m-[5px]' id='natGeo'>
              <Image
                src={natGeo}
                alt='Video'
                width='auto'
                height='auto'
              />
            </div>
          </Link>
 
          <Link href='#starWars'>
            <div className='bg-[#1E2841] rounded-md m-[5px]' id='starWars'>
              <Image
                src={starWars}
                alt='Video'
                width='auto'
                height='auto'
              />
            </div>
          </Link>
        </div>

        <Section genre={'Recommended For You'} videos={unSeenVideos(videos)} />
        <Section genre={'Marvel'} videos={filteredVideos(videos, 'marvel')}/>
        <Section genre={'Pixar'} videos={filteredVideos(videos, 'pixar')}/>
        <Section genre={'Family'} videos={filteredVideos(videos, 'family')}/>
      </div>
    </>
  )
}
