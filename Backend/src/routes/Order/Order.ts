import { create } from 'axios';
import { Router } from 'express';
import { createOrderController } from './Order.controller';
import { Post } from '../lib/methods';

const express = require('express')
const router = express.Router
console.log('order')
router.Post('/',createOrderController);
module.exports=router;
