const express = require("express");
const turnoRoutes = require("./routes/turnoRoutes");
const empleadoRoutes = require("./routes/empleadoRoutes");

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/turnos", turnoRoutes);
app.use("/empleados", empleadoRoutes);

// Servidor en escucha
app.listen(PORT, ()=>{
  console.log(`Servidor corriendo en http://localhost:`);
});