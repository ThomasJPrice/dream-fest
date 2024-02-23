import { useState, useEffect } from 'react';
import { Combobox } from '@headlessui/react';

import { AiOutlineEnter } from "react-icons/ai";

const ArtistCombobox = ({ currentlySelecting,
  setCurrentlySelecting,
  artistSelected,
  setArtistSelected,
  lineup,
  setLineup }) => {
  const [query, setQuery] = useState('');
  const [suggestedArtists, setSuggestedArtists] = useState([]);
  const API_KEY = '7b3d6d0c4d10efd3a6b71de7ee251268';

  function selectArtist(artistSelected, setLineup, lineup, currentlySelecting) {
    if (currentlySelecting > 4) return
    if (artistSelected === '') return

    var newLineup = lineup
    newLineup[currentlySelecting] = artistSelected

    setLineup(newLineup)
    setCurrentlySelecting(currentlySelecting + 1)
    setArtistSelected({ name: '' }); // Clear artistSelected
    setQuery(''); // Clear query
  }

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      selectArtist(artistSelected, setLineup, lineup, currentlySelecting);
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
          const artistsWithImages = data.results.artistmatches.artist.map(artist => ({
            name: artist.name,
            image: Array.isArray(artist.image) && artist.image.length > 0 ? artist.image[2]['#text'] : null // Selecting a suitable image size
          }));
          setSuggestedArtists(artistsWithImages.splice(0, 5));
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
          <Combobox value={artistSelected.name} onChange={(selectedArtist) => {
            setArtistSelected({
              name: selectedArtist,
            })
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
                  <Combobox.Option key={index} value={artist.name} className='hover:cursor-pointer hoverGradient hover:text-white py-1 px-2'>
                    {artist.name}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            )}
          </Combobox>
        </div>

        <button className={`p-4 gradientBg rounded-full text-white ${currentlySelecting > 4 ? 'cursor-not-allowed' : 'cursor-pointer'}`} onClick={() => selectArtist(artistSelected, setLineup, lineup, currentlySelecting)}>
          <AiOutlineEnter />
        </button>
      </div>
    </div>
  );
}

export default ArtistCombobox