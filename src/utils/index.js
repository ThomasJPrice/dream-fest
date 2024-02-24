import { useEffect, useState } from "react";

export function useArtistImage(selectedArtist) {
  const [artistImage, setArtistImage] = useState(null);

  useEffect(() => {
    const fetchArtistImage = async () => {
      try {
        const fetchURL = `${process.env.PROXY_URL}https://api.deezer.com/search?q=${selectedArtist}`;
        const response = await fetch(fetchURL);

        if (!response.ok) {
          throw new Error('Failed to fetch artist data');
        }

        const data = await response.json();

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

    if (selectedArtist) {
      fetchArtistImage();
    }
  }, [selectedArtist]);

  return artistImage || 'https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png';
}