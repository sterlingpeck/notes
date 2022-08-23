const router = require("express").Router();
const {
  findById,
  createNote,
  validateNotes,
  deleteNote,
} = require("../../lib/notes");
const notes = require("../../db/db.json");

router.get("/notes", (req, res) => {
  res.json(notes);
});

router.get("/notes/:id", (req, res) => {
  const result = findById(req.params.id, notes);
  if (result) {
    res.json(result);
  } else {
    res.send(404);
  }
});

router.post("/notes", (req, res) => {
  req.body.id = notes.length.toString();
  if (!validateNotes(req.body)) {
    res.status(400).send("Wrong Format");
  } else {
    const note = createNote(req.body, notes);
    res.json(note);
  }
});

router.delete("/notes/:id", (req, res) => {
  const result = deleteNote(req.params.id, notes);
  if (!result) {
    res.send(404).send("No note found");
  }
  res.sendStatus(204);
});

module.exports = router;
