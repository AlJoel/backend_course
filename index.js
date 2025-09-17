const express = require("express");
const path = require("path");
const webRoutes = require("./routes/webRoutes");
const turnoRoutes = require("./routes/turnoRoutes");
const empleadoRoutes = require("./routes/empleadoRoutes");

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use("/", webRoutes);
app.use("/turnos", turnoRoutes);
app.use("/empleados", empleadoRoutes);

// Servidor en escucha
app.listen(PORT, ()=>{
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});