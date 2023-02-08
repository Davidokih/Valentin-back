const express = require("express");
const { createUser,
    getPair,
    createPair,
    deleteUser,
    getAll,
    getPairedUser
} = require("../controller/userController");
const router = express.Router();

router.route("/create").post(createUser);
router.route("/get").get(getAll);
router.route("/:id").get(getPair);
router.route("/:userID/:pairID").get(getPairedUser);
router.route("/:id/delete").delete(deleteUser);
router.route("/:id/pair").patch(createPair);

module.exports = router;