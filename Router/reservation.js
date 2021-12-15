const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); //is a secured way to store passwords in my database
const Tables = require('../Module/reservation');


var Reservation = function(){
    this.table = Tables;
}


Reservation.prototype.perforam = function(req,res){  //prototype is an object that is associated with every functions and objects by default ,Prototype is the mechanism by which Js objects inherit features from one another
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

Reservation.prototype.Insert =async function(req,res){
    var reqObj = req.body
    reqObj['userId'] =req.session['sessionObj'].userId
    if(reqObj && reqObj.movieId && reqObj.userId){
                try {
                    const user = new this.table(reqObj);
                    const savedUser = user.save().then(data=>{  
                        res.json({ status: true, result: data });
                    })
                
                } catch (error) {
                    res.status(400).json({ error });
                }
    }else{
        res.json({status:false,result:'please file required filed!'})
    }
} 

Reservation.prototype.update = function(req,res){
    var reqObj = req.body
    reqObj['userId'] =req.session['sessionObj'].userId
    if( reqObj._id){
        this.table.find({_id:reqObj._id}, function(err, users) { 
            var user = users[0]
            if(err) {
                res.status(404).json({"status":false,'result':err})
            }else if(user.length>0) {
                var updateObj = user
     
                updateObj['lastupdateddate'] = new Date()
                delete updateObj['_id']
                this.table.update({_id: user._id},updateObj , function(err,rawResponse) {
                   //handle it
                   if(err) return res.status(404).json({"status":false,'result':err})
                    else res.json({status:true,result:rawResponse}) 
                })
                
            }else{
                res.json({status:false,result:"Reservation Not Found!"}) 
            }
          });
    }else{
        res.json({ststus:false,result:"Please file the required filed"})
    }
    
}
Reservation.prototype.delete = function(req,res){
    if(req.body._id){
        this.table.deleteOne({"_id":req.body._id},function(err,result){ //deleteone method to delete selected Reservation from db
            if(err)return res.json({status:false,result:result})
            else res.json({status:true,result:"Reservation deleted successfully!"})
        })
    }
    
}

Reservation.prototype.listall = function(req,res){
    this.table.findOne({_id:req.body._id}, function(err, users) { //it used to find the paticular data from mongodb it also used to list all the datas from db 
        if(err) return res.status(404).json({"status":false,'result':err})
        else res.json({status:true,result:users}) 
      });
}




module.exports = Reservation