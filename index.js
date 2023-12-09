const express = require("express");
const { PrismaClient } = require("@prisma/client");
const userRoutes = require("./src/routes/userRoutes");
const materiaRoutes = require("./src/routes/materiaRoutes");
const usuarioMateriaRoutes = require("./src/routes/usuarioMateriaRoutes");
const documentoRoutes = require("./src/routes/documentoRoutes");
const usuarioDocRoutes = require("./src/routes/usuarioDocRoutes");

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.use("/users", userRoutes);
app.use("/materias", materiaRoutes);
app.use("/usuario-materias", usuarioMateriaRoutes);
app.use("/documentos", documentoRoutes);
app.use("/usuario-documentos", usuarioDocRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
