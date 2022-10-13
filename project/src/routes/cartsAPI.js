import Container from '../controllers/container.js';
import Cart from '../models/cart.js';
import express from 'express';
const { Router } = express;

const router = Router();

const carts = new Container('data/carts.json');

/////// HTTP request methods routing //////

export default router;
