const router = require("express").Router();
const { createNote, validateNotes } = require("../../lib/notes");
const notes = require("../../db/db.json");

router.get("/notes", (req, res) => {
  res.json(notes);
});

router.post("/notes", (req, res) => {
  req.body.id = notes.length.toString();
  if (!validateNotes(req.body)) {
    res.status(400).send("Wrong format");
  } else {
    const note = createNote(req.body, notes);
    res.json(note);
  }
});

module.exports = router;
