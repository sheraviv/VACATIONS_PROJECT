
const express = require('express')
const router = express.Router()

import {  postRegistration,  } from '../handlers/index'

router.post('/', postRegistration)

export default router;

