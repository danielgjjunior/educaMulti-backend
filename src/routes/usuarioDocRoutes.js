const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

router.post('/', async (req, res) => {
  const { idDoc, idUsuario } = req.body;
  try {
    const newUserDoc = await prisma.usuarioDoc.create({
      data: { idDoc, idUsuario },
    });
    res.json(newUserDoc);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro interno do servidor');
  }
});


router.get('/', async (req, res) => {
  try {
    const usuarioDocs = await prisma.usuarioDoc.findMany();
    res.json(usuarioDocs);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro interno do servidor');
  }
});


router.put('/:id', async (req, res) => {
  const usuarioDocId = parseInt(req.params.id);
  const { idDoc, idUsuario } = req.body;
  try {
    const updatedUserDoc = await prisma.usuarioDoc.update({
      where: { id: usuarioDocId },
      data: { idDoc, idUsuario },
    });
    res.json(updatedUserDoc);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro interno do servidor');
  }
});


router.delete('/:id', async (req, res) => {
  const usuarioDocId = parseInt(req.params.id);
  try {
    const deletedUserDoc = await prisma.usuarioDoc.delete({
      where: { id: usuarioDocId },
    });
    res.json(deletedUserDoc);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro interno do servidor');
  }
});

module.exports = router;
