/**
 * WEB222 – Assignment 05
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
 *      Date:       July 19
 */

const { artists, songs } = window;

console.log({ artists, songs }, "App Data");

document.addEventListener("DOMContentLoaded", () => {
  const menu = document.getElementById("menu");
  const selectedArtistElement = document.getElementById("selected-artist");
  const artistLinksElement = document.getElementById("artist-links");
  const songsContainer = document.getElementById("songs-container");

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

  function createSongCard(song) {
    const card = document.createElement("div");
    card.classList.add("card");

    const songImg = document.createElement("img");
    songImg.src = song.imageUrl;
    songImg.classList.add("card-image");
    songImg.addEventListener("click", () => {
      window.open(song.url, "_blank");
    });

    const cardContent = document.createElement("div");
    cardContent.classList.add("card-content");

    const title = document.createElement("h3");
    title.classList.add("card-title");
    title.textContent = song.title;

    const year = document.createElement("time");
    year.classList.add("card-year");
    year.textContent = song.year;

    const duration = document.createElement("span");

    duration.classList.add("card-duration");
    const minutes = Math.floor(song.duration / 60);
    const seconds = song.duration % 60;
    duration.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;

    const spaceNode = document.createTextNode(" ");
    cardContent.appendChild(title);
    cardContent.appendChild(year);
    cardContent.appendChild(spaceNode); // 빈칸 추가
    cardContent.appendChild(duration);

    card.appendChild(songImg);
    card.appendChild(cardContent);

    return card;
  }

  function showSongs(artistId) {
    console.log(`Showing songs for artistId: ${artistId}`);
    const filteredSongs = songs.filter((song) => song.artistId === artistId);
    console.log(filteredSongs); // Log filtered songs to verify data

    songsContainer.innerHTML = "";
    filteredSongs.forEach((song) => {
      const card = createSongCard(song);
      songsContainer.appendChild(card);
    });
  }

  loadArtists();
  showArtist(artists[0]); // Show the first artist by default on load
});
