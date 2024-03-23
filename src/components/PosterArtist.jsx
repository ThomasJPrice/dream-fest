import { Textfit } from 'react-textfit';

const PosterArtist = ({ artist }) => {
  return (
    <Textfit 
      mode='single' 
      forceSingleModeWidth={true}
      className={`leading-none text-center uppercase drop-shadow-xl posterFontMain w-full`}
      max={500}
    >
      {artist.name}
    </Textfit>
  )
}

export default PosterArtist