const db = require('../models');
const Comments = db.comments;
const Posts = db.posts

exports.comment = (req,res)=>{
    const text = req.body.text
    const postId = req.body.postId;

    Comments.create({text, postId}).then(data=>{
        res.send(data)
    }).catch(err=>{
        res.send(err)
    })
}

exports.get_comments = (req,res)=>{
    Comments.findAll({
        where:{
            postId:req.params.id
        },
        include:Posts
    }).then(data=>{
        res.send(data)
    }).catch(err=>{
        res.send(err)
    })
}

exports.update = (req,res)=>{
    Comments.update(req.body,{
        where:{
            id:req.params.id
        }
    }).then(result=>{
        res.send(result)
    }).catch(err=>{
        res.send(err)
    })
}

exports.delete = (req,res)=>{
    // if(req.params.id === )
    Comments.destroy({
        where:{
            id:req.params.id
        }
    }).then(result=>res.statu(204).send({
        message:'Post Deleted'
    })).catch(err=>res.send(err))
}