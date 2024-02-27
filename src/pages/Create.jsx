import { useState } from 'react'
import { FestivalPoster, PosterOptions } from '../components'
import { blackBg, buntingBg, festivalBg, grassBg } from '../assets'

const Create = () => {
  const lineup = JSON.parse(localStorage.getItem('lineup'))

  const backgrounds = [festivalBg, grassBg, buntingBg, blackBg]

  const [posterOptions, setPosterOptions] = useState({
    title: `DreamFest`,
    backgroundIndex: 0,
    headliner: lineup[0],
    supports: [lineup[1], lineup[2], lineup[3], lineup[4]]
  })

  return (
    <>
      <div className='w-full flex mt-10 flex-col md:flex-row gap-12'>
        <FestivalPoster posterOptions={posterOptions} backgrounds={backgrounds} />

        <PosterOptions posterOptions={posterOptions} backgrounds={backgrounds} setPosterOptions={setPosterOptions} />
      </div>
    </>
  )
}

export default Create