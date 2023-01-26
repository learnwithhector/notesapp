"use strict";

const noteId = location.hash.substring(1);
let notes = getSavedNotes();
let note = notes.find((note) => note.id === noteId);

if (!note) {
  location.assign("/index.html");
}

const titleEl = document.querySelector("#note-title");
const bodyEl = document.querySelector("#note-body");
const updateInfo = document.querySelector("#update-info");
const button = document.querySelector("#remove-note");

titleEl.value = note.title;
updateInfo.textContent = `Last updated: ${moment(note.updatedAt).fromNow()}`;
bodyEl.value = note.body;

titleEl.addEventListener("input", (e) => {
  note.title = e.target.value;
  note.updatedAt = moment().valueOf();
  updateInfo.textContent = `Last updated: ${moment(note.updatedAt).fromNow()}`;
  saveNotes(notes);
});

bodyEl.addEventListener("input", (e) => {
  note.body = e.target.value;
  note.updatedAt = moment().valueOf();
  updateInfo.textContent = `Last updated: ${moment(note.updatedAt).fromNow()}`;
  saveNotes(notes);
});

button.addEventListener("click", (e) => {
  removeNote(note.id);
  saveNotes(notes);
  location.assign("/index.html");
});

window.addEventListener("storage", (e) => {
  if (e.key === "notes") {
    notes = JSON.parse(e.newValue);
    note = notes.find((note) => note.id === noteId);

    if (!note) {
      location.assign("/index.html");
    }
    titleEl.value = note.title;
    bodyEl.value = note.body;
    updateInfo.textContent = `Last updated: ${moment(
      note.updatedAt
    ).fromNow()}`;
  }
});
