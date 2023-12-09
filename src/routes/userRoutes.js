const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();


router.post('/', async (req, res) => {
  const { nome, dataNascimento, cpf, endereco, profilePhotoPath } = req.body;
  try {
    const newUser = await prisma.user.create({
      data: { nome, dataNascimento, cpf, endereco, profilePhotoPath },
    });
    res.json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro interno do servidor');
  }
});

router.get('/', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro interno do servidor');
  }
});


router.put('/:id', async (req, res) => {
  const userId = parseInt(req.params.id);
  const { nome, dataNascimento, cpf, endereco, profilePhotoPath } = req.body;
  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { nome, dataNascimento, cpf, endereco, profilePhotoPath },
    });
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro interno do servidor');
  }
});

router.delete('/:id', async (req, res) => {
  const userId = parseInt(req.params.id);
  try {
    const deletedUser = await prisma.user.delete({
      where: { id: userId },
    });
    res.json(deletedUser);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro interno do servidor');
  }
});

module.exports = router;