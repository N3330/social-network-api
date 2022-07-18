const router = require('express').Router();
const userRoutes = require('./userRoutes');


router.use('/users', userRoutes);

//export router
module.exports = router;