const db = require('../models')
const jwt = require('jsonwebtoken')

const Posts = db.posts;
const Comments = db.comments;
const Users = db.users

exports.upload = (req,res)=>{
    const { image } = req.files;
    if(!req.body.text && !image){
        res.status(400).send({message:'Please Add Some Text Or Image to Post'})
    }
    if(image){
        const dir = __dirname.split('src')[0]
        image.mv(dir+ '/uploads/' + image.name.replace(/ /g,''));
    }
    const data = {
        image:`http://localhost:8000/uploads\\${image.name.replace(/ /g,'')}`,
        userId :req.body.userId,
        text:req.body.text,
        visiblity:req.body.visiblity
    }

    Posts.create(data).then(data=>{
        res.send(data)
    }).catch(err=>{
        res.send(err)
    })
}

exports.get_all = (req,res)=>{
    Posts.findAll({
        include: [{model:Users, attributes:['email',['id', 'userId']]},{model:Comments}]
    }).then(result=>{
        res.send(result)
    }).catch(err=>{
       res.send(err)
    })
}


exports.update = (req,res)=>{
    Posts.update(req.body,{
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
    Posts.destroy({
        where:{
            id:req.params.id
        }
    }).then(result=>res.statu(204).send({
        message:'Post Deleted'
    })).catch(err=>res.send(err))
}