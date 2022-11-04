import express from 'express';
const { Router } = express;

const router = Router();

router.get('/', (req, res) => {
    res.render('webChat', {});
})

export default router;
