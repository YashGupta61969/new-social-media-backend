const db = require('../models');
const Comments = db.comments;
const Posts = db.posts
const Users = db.users

exports.comment = (req,res)=>{
    const text = req.body.text
    const postId = req.body.postId;
    const userId = req.body.userId;
    Comments.create({text, postId, userId}).then(data=>{
        res.send({status:'success',message:'Comment Created Successfully', data})
    }).catch(err=>{
        console.log(err)
        res.send({status:'error',message:err.errors[0].message})
    })
}


exports.getComments = (req,res)=>{
    Comments.findAll({
        where:{
            postId:req.params.id
        },
        include:[{model:Posts},{model:Users}]
    }).then(data=>{
        res.send({status:'success',data})
    }).catch(err=>{
        console.log(err)
        res.send({status:'error',message:err.errors[0].message})
    })
}

exports.update = (req,res)=>{
    Comments.update(req.body,{
        where:{
            id:req.params.id
        }
    }).then(()=>{
        res.send({status:'success',message:"Comment Updated successfull"})
    }).catch(err=>{
        res.send({status:'error',message:err.errors[0].message})
    })
}

exports.delete = (req,res)=>{
    Comments.destroy({
        where:{
            id:req.params.id
        }
    }).then(result=>{
        res.send({
            message:'Comment Deleted'
        })
    }
).catch(err=>res.send({status:'success',message:err.errors[0].message}))
}