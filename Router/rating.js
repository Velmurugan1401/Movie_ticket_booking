const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); //is a secured way to store passwords in my database
const Tables = require('../Module/rating');
const Conf = require('../conf')
//this is the object modal 
var Rating = function(){
    this.table = Tables
}


Rating.prototype.perforam = function(req,res){  //prototype is an object that is associated with every functions and objects by default ,Prototype is the mechanism by which Js objects inherit features from one another
    var expression = req.params.action // is getting params values in url
    switch(expression) {
        case 'add':
            this.Insert(req,res)
            break;
        case 'update':
            this.update(req,res)
            break;
        case 'list':
            this.listall(req,res)
            break;
        case 'delete':
            this.delete(req,res)
            break;
        default:
        res.json({status:false,result:"error"})
    }

}





//craete user to check already exits or not and insert from db
Rating.prototype.Insert =async function(req,res){
    var reqObj = req.body
    reqObj['userId'] =req.session['sessionObj'].userId
    if(reqObj && reqObj.movieId && reqObj.userId){
        this.table.find({movieId:reqObj.movieId}, function(err, users) { //find the paticular user and upadte that user
            var user = users[0]
            if(err) {
                res.status(404).json({"status":false,'result':err})
            }else if(user.length>0){
                
                this.table.update({_id: user._id},reqObj , function(err,rawResponse) {
                   //handle it
                   if(err) return res.status(404).json({"status":false,'result':err})
                    else res.json({status:true,result:rawResponse}) 
                })
                
            }else{
                const user = new this.table(reqObj);
                const savedUser = await user.save() .then(data=>{  //store data from db 
                    res.json({ status: true, result: data });
                })
            }
          });
    


    }else{
        res.json({status:false,result:'please file required filed!'})
    }
}  

//update users find and update the user from db
Rating.prototype.update = function(req,res){
    var reqObj = req.body
    if(reqObj.email || reqObj._id){
        this.table.find({email:reqObj.email}, function(err, users) { //find the paticular user and upadte that user
            var user = users[0]
            if(err) {
                res.status(404).json({"status":false,'result':err})
            }else {
                this.table.update({_id: user._id}, {     //upadte the user in db
                    name: reqObj.name ? reqObj.name:user.name, 
                    email:user.email,
                    password: user.password, 
                    createddate: user.createddate,
                    lastupdateddate:new Date()
                }, function(err,rawResponse) {
                   //handle it
                   if(err) return res.status(404).json({"status":false,'result':err})
                    else res.json({status:true,result:rawResponse}) 
                })
                
            }
          });
    }else{
        res.json({ststus:false,result:"Please file the required filed"})
    }
    
}

//delete user remove user from db
Rating.prototype.delete = function(req,res){
    if(req.body._id){
        this.table.deleteOne(req.body,function(err,result){ //deleteone method to delete selected user from db
            if(err)return res.json({status:false,result:result})
            else res.json({status:true,result:"User deleted successfully!"})
        })
    }
    
}

//list users from db
Rating.prototype.listall = function(req,res){
    this.table.find(req.body, function(err, users) { //it used to find the paticular data from mongodb it also used to list all the datas from db 
        if(err) return res.status(404).json({"status":false,'result':err})
        else res.json({status:true,result:users}) 
      });
}

module.exports = Rating //export user to access outside of other function