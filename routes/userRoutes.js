const getUserController = async (req, res) => {
  try {
    res.status(200).send("User Data");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error in get user API");
  }
};

module.exports = { getUserController };