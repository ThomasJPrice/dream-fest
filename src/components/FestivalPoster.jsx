import React from 'react';
import PosterArtist from './PosterArtist';

function FestivalPoster({ posterOptions, backgrounds }) {
  return (
    <div className={`md:w-[40%] w-full h-full flex flex-col text-white relative`}>
      <div className='w-full p-4 md:p-8 h-full flex flex-col'>
        <div className='text-center'>
          <h2 className='text-4xl md:text-5xl drop-shadow-xl posterFont'>{posterOptions.title}</h2>
          <p className='text-2xl md:text-3xl drop-shadow-xl posterFont'>{new Date().getFullYear()}</p>
        </div>

        <div className='flex flex-col flex-1 gap-4 w-full mt-8'>
          <p className='uppercase text-2xl text-center drop-shadow-xl subtitleFont'>presents</p>
          <PosterArtist artist={posterOptions.headliner} />
          <p className='uppercase text-2xl text-center drop-shadow-xl subtitleFont'>with special guests</p>
          <div>
            <div className='flex flex-col px-2 items-center'>
              {posterOptions.supports.map((item, index) => (
                <PosterArtist artist={item} key={item + index} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className='flex mt-4'>
        <img src={posterOptions.headliner.image} alt={posterOptions.headliner.name} className='w-1/5' />
        {posterOptions.supports.map((item, index) => (
          <img src={item.image} alt={item.name} key={item+index} className='w-1/5' />
        ))}
      </div>

      <p className='text-center mt-2 mb-1 subtitleFont'>Made with DreamFest.netlify.app</p>
      {/* <img className='absolute top-1 left-1 w-16 h-16' src="https://i.imgur.com/sQpWRzK.png" alt="thomasprice.me" /> */}
    
      <img src={backgrounds[posterOptions.backgroundIndex]} alt="bg" className='absolute -z-10 w-full h-full object-cover opacity-40' />
      <div className='-z-20 bg-black absolute top-0 left-0 w-full h-full'></div>
    </div>
  );
}

export default FestivalPoster;
