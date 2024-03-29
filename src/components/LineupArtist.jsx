const LineupArtist = ({ artist, index, currentlySelecting }) => {
  return (
    <li className={`p-1 rounded-lg shadow-lg ${currentlySelecting === index ? 'gradientBg' : 'border-[1px] border-gray-300'}`}>

      <div className={` bg-[#f5f5f5] rounded-lg`}>
        <div className="flex items-center p-1 gap-8">
            <div className="max-w-[80px] rounded-lg overflow-hidden">
              {!artist.name ? <img src="https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png" alt="Placeholder" /> : <img src={artist.image} alt={artist.name} />}
            </div>
          <span className="flex-1 text-left text-lg text-gray-900 font-semibold">
            {artist ? artist.name : currentlySelecting === index ? 'Selecting...' : 'No artist chosen'}
          </span>
        </div>
      </div>

    </li>
  )
}

export default LineupArtist