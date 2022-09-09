const router = require('express').Router();
const registrationSchema = require('../models/registrationSchema');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

router.post('/regist', async(req, res) => {

    const {name,email,password} = req.body;
    let emailExists = await registrationSchema.findOne({email});
    if (emailExists) {
        return  res.json({ success: false, message: 'email already exist' })
    }

    const registered = new registrationSchema({
       name,email,password
    })
    registered.save()
        .then((result) => {
            res.json({ success: true, message: 'Data has been created' })
        })
        .catch((err) => {
            res.json({ success: false, message: 'error' })
        })
})


router.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
        const user = await registrationSchema.findOne({ email: email });
        console.log(user);
        if (user == null) {
            return res.json({ success: false, message: 'email doesnot exist' })
        }
        const currentUserpassword = user.password

        if (password == currentUserpassword) {

            const JsonPayLoad = { id: user._id, name: user.name, email: user.email };
            const token = jwt.sign(JsonPayLoad, process.env.SECRET_KEY, { expiresIn: '3d' });
            console.log(token);
            res.json({ message: "Login is successfull", token,success:true });
        }
        else {
            res.json({ success: false, message: "User password is wrong" });
        }
    }
    catch (e) {
        console.log(e.message);
        res.json({ success: false, message: e.message });
    }
})



// router.get('/myBlogger',async (req , res , next) => {
//     const id = req.user.id;
//     try {
//         const blogs = await Blog.find({ authorDetail: id }).populate('authorDetail', '-email -password').sort({ 'postedAt': -1 });
//         res.json({ blogs });
//     }
//     catch (error) {
//         next({ status : 404 , message : error.message})
//     }
// })


module.exports = router;