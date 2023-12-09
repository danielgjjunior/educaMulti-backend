const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();


router.post('/', async (req, res) => {
  const { nomeDoc, pathDoc } = req.body;
  try {
    const newDocumento = await prisma.documento.create({
      data: { nomeDoc, pathDoc },
    });
    res.json(newDocumento);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro interno do servidor');
  }
});


router.get('/', async (req, res) => {
  try {
    const documentos = await prisma.documento.findMany();
    res.json(documentos);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro interno do servidor');
  }
});


router.put('/:id', async (req, res) => {
  const documentoId = parseInt(req.params.id);
  const { nomeDoc, pathDoc } = req.body;
  try {
    const updatedDocumento = await prisma.documento.update({
      where: { id: documentoId },
      data: { nomeDoc, pathDoc },
    });
    res.json(updatedDocumento);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro interno do servidor');
  }
});

router.delete('/:id', async (req, res) => {
  const documentoId = parseInt(req.params.id);
  try {
    const deletedDocumento = await prisma.documento.delete({
      where: { id: documentoId },
    });
    res.json(deletedDocumento);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro interno do servidor');
  }
});

module.exports = router;
