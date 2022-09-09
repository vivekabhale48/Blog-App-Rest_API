const router = require('express').Router();
const TodoSchema = require('../models/blogSchema');


router.put('/add', async (req, res) => {
    const comment = {
        comment: req.body.comment,
        userId: req.user.id,
        userName: req.user.name,
    };
    const blogID = req.body.blogID;
    try {
        const blog = await TodoSchema.findByIdAndUpdate(
            blogID,
            {
                $push: {
                    comments: {
                        $each: [comment],
                        $position: 0,
                    },
                },
            },
            { new: true },
        );
        res.status(201).json({ blog, message: 'Comment Added' });
    } catch (error) {
        res.json({ status: 500, message: error.message });
    }
});


module.exports = router;
