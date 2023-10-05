const { Signup, Login } = require("../Controllers/AuthController");
const { userVerification } = require("../middlewares/AuthMiddleware");
const router = require("express").Router();

router.post("/signup", Signup);
router.post("/login", Login);
router.post('/', userVerification);
router.get('/message', (req, res) => {
    res.send('Hello World!');
});

module.exports = router;