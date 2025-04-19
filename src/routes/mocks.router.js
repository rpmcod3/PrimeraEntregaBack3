import { Router } from 'express';
import { generateMockPet } from '../utils/generateMockPet.js';
import { generateMockUser } from '../utils/generateMockUser.js';

import Pet from '../dao/models/Pet.js';
import User from '../dao/models/User.js';


const router = Router();



router.get('/mockingpets', (req, res) => {
    const mockPets = [];
  
    for (let i = 0; i < 100; i++) {
      mockPets.push(generateMockPet());
    }
  
    res.status(200).json({
      status: 'success',
      payload: mockPets,
    });
  });
  

  router.get('/mockingusers', async (req, res) => {
    const mockUsers = [];
  
    for (let i = 0; i < 50; i++) {
      const user = await generateMockUser();
      mockUsers.push(user);
    }
  
    res.status(200).json({
      status: 'success',
      payload: mockUsers,
    });
  });
  

router.post('/generateData', async (req, res) => {
    const { users, pets } = req.body;
  
    if (!users || !pets) {
      return res.status(400).json({ message: 'Ambos parametros  "users" y "pets" son requeridos' });
    }
  
    try {
      
      const userPromises = [];
      for (let i = 0; i < users; i++) {
        userPromises.push(generateMockUser());
      }
      const mockUsers = await Promise.all(userPromises);
      await User.insertMany(mockUsers);
  
    
      const petPromises = [];
      for (let i = 0; i < pets; i++) {
        petPromises.push(generateMockPet());
      }
      const mockPets = await Promise.all(petPromises);
      await Pet.insertMany(mockPets);
  
      
      res.status(201).json({
        status: 'success',
        message: `${users} usuarios y ${pets} mascotas se han creado satisfactoriamente.`,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Ocurrio un error generando la informacion.' });
    }
  });


  export default router;

/* 
// Endpoint para generar 100 mascotas falsas
router.get('/mockingpets', (req, res) => {
  const mockPets = [];

  for (let i = 0; i < 100; i++) {
    mockPets.push(generateMockPet());
  }

  res.status(200).json({
    status: 'success',
    payload: mockPets,
  });
});

// Endpoint para generar usuarios falsos (cantidad configurable con ?count=)
router.get('/mockingusers', async (req, res) => {
  const count = parseInt(req.query.count) || 100;
  const mockUsers = [];

  for (let i = 0; i < count; i++) {
    const user = await generateMockUser();
    mockUsers.push(user);
  }

  res.status(200).json({
    status: 'success',
    payload: mockUsers,
  });
});

export default router;
 */

