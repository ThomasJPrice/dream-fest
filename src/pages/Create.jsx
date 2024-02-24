import { useState } from 'react'
import { FestivalPoster, PosterOptions } from '../components'

const Create = () => {
  const lineup = JSON.parse(localStorage.getItem('lineup'))

  const [posterOptions, setPosterOptions] = useState({
    title: `DreamFest ${new Date().getFullYear()}`,
    background: 'purpleBluePosterBg',
    font: 'posterFont1',
    headliner: lineup[0],
    supports: [lineup[1], lineup[2], lineup[3], lineup[4]]
  })

  return (
    <>
      <div className='w-full flex mt-10 flex-col md:flex-row gap-12'>
        <FestivalPoster posterOptions={posterOptions} />

        <PosterOptions posterOptions={posterOptions} setPosterOptions={setPosterOptions} />
      </div>
    </>
  )
}

export default Create