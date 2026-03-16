const userModel = require("../userModel");
const bcrypt = require('bcryptjs');
const JWT= require('jsonwebtoken');
//REGISTER
const registerController = async(req,res) => {
try {
    const {userName, email, password, phone, address} = req.body
    //validation
    if(!userName || !email || !password || !address || !phone){
        return res.status(500).send({
            success:false,
            message:'Details Missing'
        });
    }
    //check user
    const exisiting = await userModel.findOne({email});
    if(exisiting){
        return res.status(500).send({
            success:false,
            message:'Email Already Registered use a different email'
        });
    }
    //hashing password
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //create new user
    const user = await userModel.create({userName, email, password:hashedPassword, address, phone});
    res.status(201).send({
        success:true,
        message:'Successfully Registered',
        user,
    })
}        catch (error) {
            console.log(error);
            res.status(500).send({
                success:false,
                message:'Error In Register API',
                error,
            });
        }
        
        
    };
//LOGIN
const loginController = async (req,res) => {
    try {
        const {email, password} = req.body

        if(!email || !password){
            return res.status(400).send({
                success:false,
                message:'Please Provide Email or password'
            })
        }

        const user = await userModel.findOne({email});

        if(!user){
            return res.status(401).send({
                success:false,
                message:'User Not Found OR Wrong Password'
            })
        }
        //check user password | compare password
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
          return res.status(500).send({
            success: false,
            message: "Invalid Credentials",
          });
        }
        
        // token
        const token = JWT.sign({id:user._id}, process.env.JWT_SECRET,{
            expiresIn: "7d",
        });
        res.status(200).send({
            success:true,
            message:'Login Successfully',
            token,
            user,
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error In Login API',
            error
        })
    }
};
    


module.exports = { registerController, loginController};