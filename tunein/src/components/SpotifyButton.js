import React from "react";
import "../css/SpotifyButton.css";

const SpotifyButton = (link) => {
  return (
    <button
      className='spotify-btn'
      onClick={() => window.open(link.link, "_blank")}
      style={{ backgroundColor: "transparent", border: "none" }}
    >
      <img
        src='https://logodownload.org/wp-content/uploads/2020/03/listen-on-spotify.png'
        alt='Listen on Spotify'
        className='image'
        style={{ height: "30%", width: "30%" }}
      />
    </button>
  );
};

export default SpotifyButton;
