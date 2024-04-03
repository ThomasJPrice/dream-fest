import toast from "react-hot-toast";

export const spotifyLogin = (clientId) => {
  const redirectUri = process.env.REDIRECT_URL;

  console.log(redirectUri);

  const scopes = ["playlist-modify-public", "ugc-image-upload"];
  const url = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&scope=${encodeURIComponent(scopes)}`;
  window.location = url;
};

const fetchSpotify = async ({ query, token, body, method }) => {
  const response = await fetch(
    `
  https://api.spotify.com/v1/${query}`,
    {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      method: method || "GET",
    }
  );
  const data = await response.json();

  return data;
};

const getArtistId = async (artistName, token) => {
  const data = await fetchSpotify({
    query: `search?q=artist%3A${artistName}&type=artist&limit=1`,
    token: token,
  });

  try {
    const id = data.artists.items[0].id;
    return id;
  } catch (e) {
    console.log(`No ID found for ${artistName}`);
  }
};

const createPlaylist = async ({
  token,
  name,
  description,
  tracks,
  publicPlaylist,
  userID,
}) => {
  const playlistData = await fetchSpotify({
    query: `users/${userID}/playlists`,
    method: "POST",
    token: token,
    body: {
      name: name,
      description: description,
      public: publicPlaylist,
    },
  });

  const playlistId = playlistData.id;

  const playlistUris = tracks.map((track) => `spotify:track:${track}`);

  const data = await fetchSpotify({
    query: `playlists/${playlistId}/tracks`,
    method: "POST",
    token: token,
    body: {
      uris: playlistUris,
    },
  });

  console.log(data);
};

export const createSpotifyPlaylist = async (token, title) => {
  localStorage.setItem("playlistCreated", 1);
  const lineup = JSON.parse(localStorage.getItem("lineup"));
  var songs = [];

  for (let i = 0; i < lineup.length; i++) {
    // GET EACH ARTIST ID
    var id = await getArtistId(lineup[i].name, token);

    if (id) {
      // FIND TOP 10 TRACKS FOR EACH ARTIST ID
      const topTracks = await fetchSpotify({
        query: `artists/${id}/top-tracks`,
        token: token,
      });
      topTracks.tracks.map((track) => songs.push(track.id));
    }
  }

  const data = await fetchSpotify({ query: "me", token: token });
  const userID = data.id;

  toast.promise(
    createPlaylist({
      token: token,
      name: title,
      description:
        "I just created my dream music festival on this site, you can too! https://dreamfest.netlify.app 🎵🎵",
      tracks: songs,
      userID: userID,
      publicPlaylist: true,
    }),
    {
      loading: 'Creating playlist...',
      success: 'Playlist created!',
      error: 'Unable to create playlist'
    }
  );
};
