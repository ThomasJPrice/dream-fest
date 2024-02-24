import { useState, useEffect } from 'react';
import { Combobox } from '@headlessui/react';

import { AiOutlineEnter } from "react-icons/ai";
import { useArtistImage } from '../utils';

const ArtistCombobox = ({ currentlySelecting,
  setCurrentlySelecting,
  artistSelected,
  setArtistSelected,
  lineup,
  setLineup }) => {

  const [query, setQuery] = useState('');
  const [suggestedArtists, setSuggestedArtists] = useState([]);

  const API_KEY = process.env.LASTFM_KEY;

  var artistImage = useArtistImage(artistSelected)

  async function selectArtist(artistSelected, setLineup, lineup) {
    if (currentlySelecting > 4) return
    if (artistSelected === '') return

    const artistObject = {
      name: artistSelected,
      image: artistImage,
    }

    var newLineup = lineup
    newLineup[currentlySelecting] = artistObject

    setLineup(newLineup)

    var tempSelecting = currentlySelecting + 1
    setCurrentlySelecting(currentlySelecting + 1)

    console.log(tempSelecting);
    localStorage.setItem('lineup', JSON.stringify(lineup))
    localStorage.setItem('currentlySelecting', JSON.stringify(tempSelecting))

    setArtistSelected(''); // Clear artistSelected
    setQuery(''); // Clear query
  }

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      selectArtist(artistSelected, setLineup, lineup);
    }
  }

  useEffect(() => {
    if (!query) {
      setSuggestedArtists([]);
      return;
    }

    const fetchArtists = async () => {
      try {
        const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${query}&api_key=${API_KEY}&format=json`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        if (data.results && data.results.artistmatches && data.results.artistmatches.artist) {
          const artists = data.results.artistmatches.artist.map(artist => (artist.name));
          setSuggestedArtists(artists.splice(0, 5));
        } else {
          setSuggestedArtists([]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setSuggestedArtists([]);
      }
    };

    fetchArtists();
  }, [query]);

  return (
    <div className='w-full sm:w-[400px] gradientBg rounded-full items-center p-[3px]'>
      <div className='w-full flex gap-4 relative p-1 bg-[#f5f5f5] items-center rounded-full'>
        <div className='pl-2 flex-1'>
          <Combobox value={artistSelected} onChange={(selectedArtist) => {
            setArtistSelected(selectedArtist)
          }}>
            <Combobox.Input
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search for artists..."
              className='w-full flex flex-col bg-[#f5f5f5] focus:outline-none'
              onKeyPress={handleKeyPress}
            />
            {suggestedArtists.length > 0 && (
              <Combobox.Options className='absolute bg-[#f5f5f5] z-10 top-[56px] shadow-md'>
                {suggestedArtists.map((artist, index) => (
                  <Combobox.Option key={index} value={artist} className='hover:cursor-pointer hoverGradient hover:text-white py-1 px-2'>
                    {artist}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            )}
          </Combobox>
        </div>

        <button className={`p-4 gradientBg rounded-full text-white ${currentlySelecting > 4 ? 'cursor-not-allowed' : 'cursor-pointer'}`} onClick={() => selectArtist(artistSelected, setLineup, lineup)}>
          <AiOutlineEnter />
        </button>
      </div>
    </div>
  );
}

export default ArtistCombobox