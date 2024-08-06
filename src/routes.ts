import { Router, Request, Response } from 'express';
import path from 'path';
import { updateManual } from './manageDonations';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

router.post('/api/add', (req, res) => {
  const { amount } = req.body;

  if (typeof amount !== 'number') {
    return res.status(400).json({ error: 'Value must be a number' });
  }

  updateManual(amount, 'add');
  res.status(200).json({ message: `Amount of ${amount} added successfully ` });
});

router.post('/api/remove', (req, res) => {
  const { amount } = req.body;

  if (typeof amount !== 'number') {
    return res.status(400).json({ error: 'Value must be a number' });
  }

  updateManual(amount, 'remove');
  res.status(200).json({ message: `Amount of ${amount} removed successfully` });
});

export default router;
