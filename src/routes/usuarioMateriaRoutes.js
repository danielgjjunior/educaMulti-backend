const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

router.post('/', async (req, res) => {
  const { idUsuario, idMateria, notaUsuario, concluido } = req.body;
  try {
    const newUserMateria = await prisma.usuarioMateria.create({
      data: { idUsuario, idMateria, notaUsuario, concluido },
    });
    res.json(newUserMateria);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro interno do servidor');
  }
});


router.get('/', async (req, res) => {
  try {
    const usuarioMaterias = await prisma.usuarioMateria.findMany();
    res.json(usuarioMaterias);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro interno do servidor');
  }
});


router.put('/:id', async (req, res) => {
  const usuarioMateriaId = parseInt(req.params.id);
  const { idUsuario, idMateria, notaUsuario, concluido } = req.body;
  try {
    const updatedUserMateria = await prisma.usuarioMateria.update({
      where: { id: usuarioMateriaId },
      data: { idUsuario, idMateria, notaUsuario, concluido },
    });
    res.json(updatedUserMateria);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro interno do servidor');
  }
});


router.delete('/:id', async (req, res) => {
  const usuarioMateriaId = parseInt(req.params.id);
  try {
    const deletedUserMateria = await prisma.usuarioMateria.delete({
      where: { id: usuarioMateriaId },
    });
    res.json(deletedUserMateria);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro interno do servidor');
  }
});

module.exports = router;
