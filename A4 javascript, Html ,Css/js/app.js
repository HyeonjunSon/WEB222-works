/**
 * WEB222 – Assignment 04
 *
 * I declare that this assignment is my own work in accordance with
 * Seneca Academic Policy. No part of this assignment has been
 * copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Please update the following with your information:
 *
 *      Name:       HyeonjunSon
 *      Student ID: 123526238
 *      Date:       July 5
 */

const { artists, songs } = window;

console.log({ artists, songs }, "App Data");

document.addEventListener("DOMContentLoaded", () => {
  const menu = document.getElementById("menu");
  const selectedArtistElement = document.getElementById("selected-artist");
  const artistLinksElement = document.getElementById("artist-links");
  const songsListElement = document.getElementById("songs");

  function loadArtists() {
    artists.forEach((artist) => {
      const button = document.createElement("button");
      button.textContent = artist.name;
      button.addEventListener("click", () => {
        showArtist(artist);
      });
      menu.appendChild(button);
    });
  }

  function showArtist(artist) {
    selectedArtistElement.textContent = artist.name;
    artistLinksElement.innerHTML = "";
    artist.urls.forEach((link) => {
      const anchor = document.createElement("a");
      anchor.href = link.url;
      anchor.textContent = link.name;
      anchor.target = "_blank";
      artistLinksElement.appendChild(anchor);
      artistLinksElement.appendChild(document.createTextNode(" "));
    });
    showSongs(artist.artistId);
  }

  function showSongs(artistId) {
    console.log(`Showing songs for artistId: ${artistId}`);
    const filteredSongs = songs.filter((song) => song.artistId === artistId);
    console.log(filteredSongs); // Log filtered songs to verify data

    songsListElement.innerHTML = "";
    filteredSongs.forEach((song) => {
      const row = document.createElement("tr");
      row.addEventListener("click", () => {
        console.log(song);
      });

      const titleCell = document.createElement("td");
      const titleLink = document.createElement("a");
      titleLink.href = song.url;
      titleLink.textContent = song.title;
      titleLink.target = "_blank";
      titleCell.appendChild(titleLink);
      row.appendChild(titleCell);

      const yearCell = document.createElement("td");
      yearCell.textContent = song.year;
      row.appendChild(yearCell);

      const durationCell = document.createElement("td");
      const minutes = Math.floor(song.duration / 60);
      const seconds = song.duration % 60;
      durationCell.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;
      row.appendChild(durationCell);

      songsListElement.appendChild(row);
    });
  }

  loadArtists();
  showArtist(artists[0]); // Show the first artist by default on load
});
