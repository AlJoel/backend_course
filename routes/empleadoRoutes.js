const express = require("express");
const {
    getEmpleados,
    addEmpleado,
    updateEmpleado,
    patchEmpleado,
    deleteEmpleado
} = require("../controllers/empleadoController");

const router = express.Router();

router.get("/", getEmpleados);
router.post("/agregar", addEmpleado);
router.put("/:id", updateEmpleado);
router.patch("/:id", patchEmpleado);
router.delete("/:id", deleteEmpleado);

module.exports = router;
