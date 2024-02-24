const PosterArtist = ({ artist, imgWidth }) => {
  return (
    <div className="flex flex-col gap-2 items-center">
      <img className={imgWidth} src={artist.image} alt={artist.name} />
      <p className="">{artist.name}</p>
    </div>
  )
}

export default PosterArtist