import React, { useState, useEffect } from 'react';

const ArtistImage = ({ artistName }) => {
  const [artistImage, setArtistImage] = useState(null);

  useEffect(() => {
    const fetchArtistImage = async () => {
      try {
        const proxyURL = 'https://cors-anywhere.herokuapp.com/';
        const fetchURL = `${proxyURL}https://api.deezer.com/search?q=${artistName}`;
        const response = await fetch(fetchURL);

        if (!response.ok) {
          throw new Error('Failed to fetch artist data');
        }

        const data = await response.json();

        console.log(fetchURL);
        console.log(data.data);

        // Assuming the first result is the correct artist
        if (data.data && data.data.length > 0) {
          const imageUrl = data.data[0].artist.picture_xl;
          setArtistImage(imageUrl || null);
        } else {
          throw new Error('No artist found');
        }
      } catch (error) {
        console.error('Error fetching artist image:', error);
        setArtistImage(null);
      }
    };

    if (artistName) {
      fetchArtistImage();
    }
  }, [artistName]);

  return (
    <div className='max-w-[80px] rounded-lg overflow-hidden'>
      {artistImage ? (
        <img src={artistImage} alt={`Image of ${artistName}`} />
      ) : (
        <img src={'https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png'} alt="Placeholder" />
      )}
    </div>
  );
};

export default ArtistImage;
