const db = require('../models')
const fs= require('fs');
const path = require('path');
// const jwt = require('jsonwebtoken')

const Posts = db.posts;
const Comments = db.comments;
const Users = db.users

exports.upload = (req,res)=>{
    if(!req.body.text && !req?.files?.image){
       return res.status(400).send({status:'error',message:'Please Add Some Text Or Image to Post'})
    }
    if(req?.files?.image){
        const dir = __dirname.split('src')[0]
        req.files.image.mv(dir+ '/uploads/' +  req.files.image.name.replace(/ /g,''));
    }
    const data = {
        image:req?.files?.image ? `http://localhost:8000/uploads\\${req.files.image.name.replace(/ /g,'')}`:null,
        userId :req.body.userId,
        text:req.body.text,
        visiblity:req.body.visiblity
    }

    Posts.create(data).then(data=>{
        res.send({status:'success',...data})
    }).catch(err=>{
        res.status(500).send({status:'error',message:'Internal Server Error',error:err})
    })
}

exports.get_all = (req,res)=>{
    Posts.findAll({
        include: [{model:Users, attributes:['email',['id', 'userId']]},{model:Comments}]
    }).then(result=>{
        res.send({status:'success',result})
    }).catch(err=>{
        console.log(err)
       res.status(500).send({status:'error',message:'Internal Server Error',error:err})
    })
}


exports.update = (req,res)=>{
    Posts.update(req.body,{
        where:{
            id:req.params.id,
        }
    }).then(result=>{
        res.send({status:'success',message:'Post Updated Successfully'})
    }).catch(err=>{
        res.send.status(500).send({status:'error',message:'Internal Server Error',error:err})
    })
}

exports.delete = (req,res)=>{
    Posts.destroy({
        where:{
            id:req.params.id
        }
    }).then(()=>res.status(201).send({
        status:'success',message:'Post Deleted'
    })).catch(err=>{console.log(err);res.status(500).send({status:'error',message:'Internal Server Error',error:err})})
}

exports.deleteImage = (req,res)=>{
    fs.readdir('./uploads',(err,files)=>{
        if(err){
            console.log(err)
            return res.send({error:err});
        }
        const name = files.find(file=>file===req.params.name)
        if(name){
            const directory = __dirname.split('\\').map((f=>{
                const replaced = f.replace('src','').replace('controllers','')
                if(replaced){
                    return replaced
                }
            })).filter(val=>{
                if(val){
                    return val;
                }
            }).join('\\')

            fs.unlink(path.join(directory,'\\uploads\\', name),(err)=>{
                if(err){
                    res.send(err)
                }else{
                    res.send({messgae:'Image Deleted Successfully'})
                }
            })
        }
    })
}