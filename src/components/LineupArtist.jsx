import ArtistImage from "./ArtistImage"

const LineupArtist = ({ artist, index, currentlySelecting }) => {
  return (
    <li className={`p-1 rounded-lg shadow-lg ${currentlySelecting === index ? 'gradientBg' : 'border-[1px] border-gray-300'}`}>

      <div className={` bg-[#f5f5f5] rounded-lg`}>
        <div className="flex items-center p-1 gap-8">
          {!artist.name ?
            <div className='max-w-[80px] rounded-lg overflow-hidden'>
              <img src={'https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png'} alt="Placeholder" />
            </div> : <ArtistImage artistName={artist.name} />}

          <span className="flex-1 text-left text-lg">
            {artist ? artist.name : currentlySelecting === index ? 'Selecting...' : 'No artist chosen'}
          </span>
        </div>
      </div>

    </li>
  )
}

export default LineupArtist