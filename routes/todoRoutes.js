const router = require('express').Router();
const { userInfo } = require('os');
const TodoSchema = require('../models/blogSchema');


// router.get('/get_all',(req,res)=>{
//     res.json('Found all the Tasks')
// })

router.post('/add_task', (req, res) => {
    const todo = new TodoSchema({
        name: req.body.name,
        about: req.body.about,
        authorDetail: req.user.id
    })
    todo.save()
        .then((result) => {
            res.json({ success: true, message: 'Data has been created' })
        })
        .catch((err) => {
            res.json({ success: false, message: 'error' })
        })
})

router.get('/get_all', async (req, res) => {

    try{
    const result = await TodoSchema.find({})
    .populate('authorDetail', '-email -password').sort({'created_at':-1})
    res.json({ success: true, data: result })
    
}
catch(error){
    res.json({ success: false, message: 'error' })
}
})


router.get('/get/:id', (req, res) => {

    const id = req.params.id;
    TodoSchema.find({ _id: id })
        .exec()
        .then((result) => {
            res.json({ success: true, data: result })
        })
        .catch((err) => {
            res.json({ success: false, message: "Error occured" })
        })
})

router.put('/update/:id', async (req, res) => {
    const id = req.params.id;
    // TodoSchema.updateOne({_id: id}, 
    //     {$set: {
    //         name:req.body.name,
    //         about: req.body.about,
    //         date: req.body.date
    //     }})
    // .exec()
    // .then((result)=>{
    //     res.json({success: true, message: "Todo has been updated!"})
    // })
    // .catch((err)=>{
    //     res.json({success: false, message: "Error occured"})
    // })
    try {
        await TodoSchema.updateOne({_id: id}, {
            $set: {
                name: req.body.name,
                about: req.body.about,
               
            }
        }, { new: true })
        res.status(201).json({message: "Record Updated" })
    }
    catch (error) {
       console.log(error);
    }
})

router.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    TodoSchema.deleteOne({ _id: id })
        .then(() => {
            res.json({ success: true, message: `Todo with id: ${id} deleted` });
        })
        .catch((err) => {
            res.json({ success: false, message: "Error deleting the task" })
        })
})


router.get('/getAllBloggers', async (req , res) => {
    const id = req.user.id;
    try {
        const blogs = await TodoSchema.find({ authorDetail : id }).populate('authorDetail', '-email -password').sort({ 'postedAt': -1 });
        res.json({ blogs });
    }
    catch (error) {
        res.json({ status : 404 , message : error.message})
    }
})

module.exports = router;