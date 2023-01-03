const db = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');

const Users = db.users;
const Posts = db.posts;


exports.get_all = (req,res)=>{
    Users.findAll({
        attributes:['email', 'id'],
        include:Posts
    }).then(result=>res.send(result)).catch(err=>res.status(400).send(err))
}

exports.signUp = (req,res) => {
    if(!req.body.email || !req.body.password){
         res.status(400).send({message:!req.body.email ? 'Please Enter Your Email' : 'Please Enter Your Password'})
    }else{
        // find the emails in the db if exists
        Users.findAll({
            where:{
                email:{
                    [Op.eq]:req.body.email   
                }
            }
        }).then(data=>{
            if(!data.length){
                // creates the hash for the password provided
                bcrypt.hash(req.body.password, 10, (err,hash)=>{
                    if (err) {
                         res.status(500).json({
                          error: err
                        });
                      }
                      else{
                          Users.create({email:req.body.email, password: hash}).then(()=>{
                             res.send({message:'User Created Successfully'})
                            }).catch(err=>{
                                res.status(400).send(err)
                         })
                      }
                    })
                }else{
                    res.status(403).send({message:'Email Already Exists'})
            }
        }).catch(err=>{
            console.log(err)
        })
    }
}

exports.login = (req,res)=>{
    // find a single user in the db if esists
    Users.findOne({where:{email:req.body.email}}).then(user=>{
        if(!user){
            return res.status(401).status(404).send({message:'Email Not Found'})
        }else{
            // compares the password provided with the hash
            bcrypt.compare(req.body.password, user.password, (err, result)=>{
                if (err) {
                    return res.status(401).json({
                      message: "Auth failed",
                      error:err
                    });
                }
                if(result){
                    // creates jwt signature 
                    const token = jwt.sign(
                        {
                            email: user.email,
                            userId: user.id
                        },
                        process.env.JWT_KEY,
                        {
                          expiresIn: "1h"
                        }
                        );
                        return res.send({
                        message:'Auth Successful',
                        token:token,
                        id:user.id,
                        email:user.email
                      })
                  }
            })
        }
    })
}