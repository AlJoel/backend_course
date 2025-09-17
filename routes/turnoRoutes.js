const express = require("express");
const {
    getTurnos,
    addTurno,
    updateTurno,
    patchTurno,
    deleteTurno
} = require("../controllers/turnoController");

const router = express.Router();

router.get("/", getTurnos);
router.post("/agregar", addTurno);
router.put("/:id", updateTurno);
router.patch("/:id", patchTurno);
router.delete("/:id", deleteTurno);

module.exports = router;
