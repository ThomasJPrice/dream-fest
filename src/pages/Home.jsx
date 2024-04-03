import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Hero, LineupPicker } from "../components";
import { createSpotifyPlaylist } from "../utils/spotify";

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams(
    window.location.hash.substring(1)
  );
  const spotifyToken = searchParams.get("access_token");

  useEffect(() => {
    const createPlaylist = async () => {
      if (spotifyToken && !parseInt(localStorage.getItem("playlistCreated"))) {
        const title = localStorage.getItem('festivalTitle') + ' 2024'
        await createSpotifyPlaylist(spotifyToken, title);
      }
    };

    createPlaylist();
  }, [spotifyToken]);

  return (
    <>
      <Hero />
      <LineupPicker />
    </>
  );
};

export default Home;
