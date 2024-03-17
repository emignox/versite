const router = require("express").Router(); // Import express and create a Router
const authController = require("../controllers/authController"); // Import the authController
const userController = require("../controllers/userController"); // Import the userController
const uploadcontroller = require("../controllers/upload.controller");
const multer = require("multer"); // Import multer
const upload = multer();
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logout);

//user.db
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.patch("/follow/:id", userController.follow);
router.patch("/unfollow/:id", userController.unfollow);

//upload
router.post("/upload", upload.single("file"), uploadcontroller.uploadProfil);

module.exports = router;

// Create a new user
