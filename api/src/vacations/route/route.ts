const express = require('express')
const router = express.Router()

import {
    
    getVacations,
    deleteVacation,
    likeVacation,
    unlikeVacation,
    filteredVacation,
    likedCheack,
    userData,
    updateVacation,
    createVacation
} from '../hendlers/index'




router.get('/', getVacations)




router.post('/follow/:id', likeVacation)

router.delete('/follow/:id', unlikeVacation)

router.get('/follow/', likedCheack)

router.get('/filtered/', filteredVacation)

router.get('/userData/', userData)



router.post('/', createVacation)

router.delete('/:id', deleteVacation)

router.post('/updatevacation/:id', updateVacation)



export default router;

