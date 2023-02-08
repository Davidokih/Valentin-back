const userModel = require("../model/userModel");
const pairrModel = require("../model/pairModel");

const createUser = async (req, res) => {
    try {
        const { name } = req.body;

        const user = await userModel.create({
            name,
            paired: false
        });

        res.status(201).json({
            status: "Success",
            data: user
        });
    } catch (error) {
        res.status(500).json({
            status: "Fail",
            message: error
        });
    }
};

const getAll = async (req, res) => {
    try {

        const user = await userModel.find();

        res.status(200).json({
            status: "Success",
            data: user
        });
    } catch (error) {
        res.status(500).json({
            status: "Fail",
            message: error
        });
    }
};
const getPair = async (req, res) => {
    try {

        const user = await userModel.findById(req.params.id);

        res.status(200).json({
            status: "Success",
            data: user
        });
    } catch (error) {
        res.status(500).json({
            status: "Fail",
            message: error
        });
    }
};
const getPairedUser = async (req, res) => {
    try {

        const userID = req.params.userID;
        const user = await userModel.findById(req.params.pairID).populate("pair");

        res.status(200).json({
            status: "Success",
            data: user
        });
    } catch (error) {
        res.status(500).json({
            status: "Fail",
            message: error
        });
    }
};

const createPair = async (req, res) => {
    try {
        // const id = req.params.id;
        const user = await userModel.findById(req.params.id);
        const getLove = await userModel.find();

        if (user.paired === false) {
            const random = Math.floor(Math.random() * getLove.length);

            const myPair = getLove[ random ];
            // console.log(myPair);
            if (user.name !== myPair.name) {

                await userModel.findByIdAndUpdate(req.params.id, {
                    paired: true,
                    $push: { pair: myPair }
                }, { new: true });
                // await pairrModel.findByIdAndUpdate(req.params.id, {
                //     $push: { pairr: myPair._id }
                // }, { new: true });

                res.status(200).json({
                    status: "Paired successfully",
                    message: `You are paired with ${myPair.name}`
                });
            } else {
                res.json({
                    message: "CLick on the button to pair again"
                });
            }
        } else {
            res.status(200).json({
                message: "You have already paired with someOne"
            });
        }
    } catch (error) {
        res.status(500).json({
            status: "Fail",
            message: error
        });
    }
};

const deleteUser = async (req, res) => {
    try {

        const user = await userModel.findByIdAndDelete(req.params.id);

        res.status(200).json({
            status: "Success",
            message: "User deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            status: "Fail",
            message: error
        });
    }
};

module.exports = {
    createUser,
    getPair,
    createPair,
    deleteUser,
    getAll,
    getPairedUser
};