const express = require('express');
const router = express.Router();
const user = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


router.post('/signup', async (req, res) => {

    const { mobileEmail, fullName, password } = req.body;

    try{

        const existingUser = await user.findOne({
            mobileEmail: mobileEmail
        });

        if(existingUser) {
            console.log("User already exists.");
            return res.status(400).json({ message: "User already exists." });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        await user.create({
            mobileEmail: mobileEmail,
            fullName: fullName,
            password: hashedPassword,
            liked: []
        });

        console.log("New user created");
        return res.status(200).json({ message: "Done!"});

    } catch(error){
        console.log("Something went wrong.");
        return res.status(500).json({ message: "Something went wrong." });
    }
})

router.post('/login', async (req, res) => {

    const { mobileEmail, password } = req.body

    try{
        const existingUser = await user.findOne({
            mobileEmail: mobileEmail
        });

        if (existingUser) {
            const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

            if (isPasswordCorrect){

                const token = jwt.sign({ email: existingUser.mobileEmail }, 'prelude', { expiresIn: "2d" });
                console.log("Login Successful");
                return res.status(200).json({ result: existingUser, token });

            } else{
                console.log("Password incorrect!");
                return res.status(400).json({ message: "Password incorrect!" });
            }

        } else{
            console.log("User doesn't exist!");
            return res.status(404).json({ message: "User doesn't exist!" });
        }

    } catch(error){
        console.log("Something went wrong.");
        return res.status(500).json({ message: "Something went wrong." });
    }
})


router.get('/', async (req, res) => {

    try{
        const token = req.headers['x-access-token'];
        const decoded = jwt.verify(token, 'prelude');
        const email = decoded.email;

        const existingUser = await user.findOne({ mobileEmail: email });
        
        if(!existingUser){
            return res.status(500).json({ message: "Something went wrong." });
        } else{
            return res.status(200).json({ existingUser });
        }

    } catch(error){
        console.log("Something went wrong.");
        return res.status(500).json({ message: "Something went wrong." });
    }
});



router.get('/liked/:email', async (req, res) => {

    try{

        const liked = await user.findOne({ mobileEmail: req.params.email }).select({"liked": 1, "_id":0});
        if(liked===null){
            return res.status(500).json({ message: "Something went wrong." });
        } else{
            return res.status(200).json({ liked: liked.liked });
        }

    } catch(error){
        console.log("Something went wrong.");
        return res.status(500).json({ message: "Something went wrong." });
    }
});



router.post('/updateLiked/:email', async(req, res) => {

    try{
        let done = await user.findOneAndUpdate({ mobileEmail: req.params.email }, { liked: req.body.liked });
        if(!done){
            return res.status(500).json({ message: "Something went wrong." });
        } else{
            return res.status(200);
        }
    } catch (error){
        console.log("Something went wrong.");
        return res.status(500).json({ message: "Something went wrong." });
    }

});



router.post('/updateLikedSong/:email', async(req, res) => {

    try{
        let done;
        if(req.body.liked){
            done = await user.findOneAndUpdate({ mobileEmail: req.params.email }, { $push: { liked: req.body.song }});
        } else {
            done = await user.findOneAndUpdate({ mobileEmail: req.params.email }, { $pull: { liked: req.body.song }});
        }
        if(!done){
            return res.status(500).json({ message: "Something went wrong." });
        } else{
            return res.status(200);
        }
    } catch (error){
        console.log("Something went wrong.");
        return res.status(500).json({ message: "Something went wrong." });
    }

})


router.get('/find/:email', async(req, res) => {
    try {
        done = await user.findOne({ mobileEmail: req.params.email });
        if(done){
            return res.status(200).json({ message: "Registered user" });
        } else{
            return res.status(400).json({ message: "Unregistered user" });
        }
    } catch(error) {
        return res.status(500).json({ message: "Oops, something went wrong!" });
    }
})



router.post('/changePassword/:email', async(req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        done = user.findOneAndUpdate({ mobileEmail: req.params.email }, { password: hashedPassword })
        if(done){
            return res.status(200).json({ message: "Done" });
        } else{
            return res.status(400).json({ message: "Error occured" });
        }
    } catch(error) {
        return res.status(500).json({ message: "Oops, something went wrong!" });
    }
})




module.exports = router;