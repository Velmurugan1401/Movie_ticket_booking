const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); //is a secured way to store passwords in my database
const Tables = require('../Module/movie');


var Movie = function(){
    this.table = Tables;
}


Movie.prototype.perforam = function(req,res){  //prototype is an object that is associated with every functions and objects by default ,Prototype is the mechanism by which Js objects inherit features from one another
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

Movie.prototype.Insert =async function(req,res){
    var reqObj = req.body
    
    if(reqObj && reqObj.title && reqObj.language && reqObj.duration && reqObj.endDate && reqObj.releaseDate){
        if (await this.table.findOne({ title: reqObj.title })) {  //this method also same to find 
            res.json({status:false,result:"Movie already exixts"})
        }else{
                try {
                  
                    const user = new this.table(reqObj);
                    const savedUser = await user.save() .then(data=>{  //store data from db 
                        res.json({ status: true, result: data });
                    })
                
                } catch (error) {
                    res.status(400).json({ error });
                }
            
        }


    }else{
        res.json({status:false,result:'please file required filed!'})
    }
} 

Movie.prototype.update = function(req,res){
    var reqObj = req.body
    if( reqObj._id){
        this.table.find({_id:reqObj._id}, function(err, users) { //find the paticular movie and upadte that movie
            var user = users[0]
            if(err) {
                res.status(404).json({"status":false,'result':err})
            }else if(user.length>0) {
                var updateObj = user
                updateObj['name'] = reqObj.name ? reqObj.name:user.name
                updateObj['image'] = reqObj.image ? reqObj.image :user.image
                updateObj['endDate'] = reqObj.endDate ? reqObj.endDate :user.endDate
                updateObj['duration'] = reqObj.duration ? reqObj.duration :user.duration
                updateObj['createddate'] =  user.createddate
                updateObj['lastupdateddate'] = new Date()
                delete updateObj['_id']
                this.table.update({_id: user._id},updateObj , function(err,rawResponse) {
                   //handle it
                   if(err) return res.status(404).json({"status":false,'result':err})
                    else res.json({status:true,result:rawResponse}) 
                })
                
            }else{
                res.json({status:false,result:"Movie Not Found!"}) 
            }
          });
    }else{
        res.json({ststus:false,result:"Please file the required filed"})
    }
    
}
Movie.prototype.delete = function(req,res){
    if(req.body._id){
        this.table.deleteOne({"_id":req.body._id},function(err,result){ //deleteone method to delete selected movie from db
            if(err)return res.json({status:false,result:result})
            else res.json({status:true,result:"Movie deleted successfully!"})
        })
    }
    
}

Movie.prototype.listall = function(req,res){
    this.table.find(req.body, function(err, users) { //it used to find the paticular data from mongodb it also used to list all the datas from db 
        if(err) return res.status(404).json({"status":false,'result':err})
        else res.json({status:true,result:users}) 
      });
}




module.exports = Movie