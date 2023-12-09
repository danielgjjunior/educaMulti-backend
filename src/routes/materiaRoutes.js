const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();


router.post('/', async (req, res) => {
  const { nomeMateria, nomeProfessor, ativa, backgroundPath } = req.body;
  try {
    const newMateria = await prisma.materia.create({
      data: { nomeMateria, nomeProfessor, ativa, backgroundPath },
    });
    res.json(newMateria);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro interno do servidor');
  }
});


router.get('/', async (req, res) => {
  try {
    const materias = await prisma.materia.findMany();
    res.json(materias);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro interno do servidor');
  }
});

router.put('/:id', async (req, res) => {
  const materiaId = parseInt(req.params.id);
  const { nomeMateria, nomeProfessor, ativa, backgroundPath } = req.body;
  try {
    const updatedMateria = await prisma.materia.update({
      where: { id: materiaId },
      data: { nomeMateria, nomeProfessor, ativa, backgroundPath },
    });
    res.json(updatedMateria);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro interno do servidor');
  }
});


router.delete('/:id', async (req, res) => {
  const materiaId = parseInt(req.params.id);
  try {
    const deletedMateria = await prisma.materia.delete({
      where: { id: materiaId },
    });
    res.json(deletedMateria);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro interno do servidor');
  }
});

module.exports = router;
