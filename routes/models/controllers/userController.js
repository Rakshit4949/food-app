//GET USER INFO
const getUserController = async () => {
    res.status(200).send('User Data');
};

module.exports = { getUserController };