import { Component } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import moment from 'moment'


class Movielist extends Component{

    constructor(){
        super();
        this.list = [];
        this.seatlist = []
        this.state = {
            arr : this.list,
            show : false,
            seates:this.seatlist
            
        }
        // this.listmovie = this.listmovie.bind(this)
    }
  
   handle(){
    this.setState({show:false})
   }
    componentWillMount(){
        this.limt();
      }
      getdetaila(){
        this.setState({show:true})
    }
    bookticket(event){
        const header=new Headers({'Content-Type':'application/json'});
        const requestOptions = {
        method: 'POST',
        headers: header,
        // session:{sessionObj:},
        body: JSON.stringify({token:window.sessionStorage.getItem('token'),_id:event.target.value})
        };
        fetch('http://localhost:2022/api/reservation/list',requestOptions)
        .then(response => response.json())
        .then(response => {
            console.log(response)
            if(response.result && response.result.length){

            }else{
                
            }
            this.setState({show:true})
        });
    }
 
 limt = ()=>{
    const header=new Headers({'Content-Type':'application/json'});
    const requestOptions = {
    method: 'POST',
    headers: header,
    // session:{sessionObj:},
    body: JSON.stringify({token:window.sessionStorage.getItem('token')})
    };
    fetch('http://localhost:2022/api/movie/list',requestOptions)
    .then(response => response.json())
    .then(response => {
    // console.log(response)
   
    //    UserProfile.setName(response)
    if(response.status){
        for(var i=0;i<response.result.length;i++){
            this.list.push(  <div class="col-lg-4 col-sm-6 mb-4"><div class="card "  role="button" >
            <img src="data:image/png;base64,AA==" alt="Red dot" />
            <h3>{response.result[i].title}</h3>
            <div class="card-body">
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            
                <button type="button" value={response.result[i]._id} onClick={this.bookticket.bind(this)} class="btn btn-warning text-white">Book</button>
            </div>
            </div></div>)
           
        }
        this.setState({arr:this.list})
      
        // return(<div>hiii</div>)
    }else {
    // return false
    }

    // console.log(response)

    })
  }
render(){
    // this.listmovie()
    return(
        <div>
            <div className="row movielist" >
                {this.state.arr}
            
            </div>


            <Modal show={this.state.show} onHide={this.handle.bind(this)}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
           <div className="container border-bottom">
           <div className=" mb-2"><input type="date" defaultValue={moment().format("yyyy-MM-DD")}></input></div>
               <div className="row mb-2">
                   <div className="col-2 mb-2"><button type="button" class="btn btn-light">07:00 AM</button></div>
                   <div className="col-2"><button type="button" class="btn btn-light">10:00 AM</button></div>
                   <div className="col-2"><button type="button" class="btn btn-light">01:00 PM</button></div>
                   <div className="col-2"><button type="button" class="btn btn-light">03:00 PM</button></div>
                   <div className="col-2"><button type="button" class="btn btn-light">06:00 PM</button></div>
                   <div className="col-2"><button type="button" class="btn btn-light">09:00 PM</button></div>
                   <div className="col-2"><button type="button" class="btn btn-light">12:00 AM</button></div>
                   <div className="col-2"><button type="button" class="btn btn-light">03:00 AM</button></div>

               </div>

           </div>
           <div className="container mt-2">
               <div className="row">
                   {/* <div className="col-2 mb-2"><button type="button" class="btn btn-light">1</button></div>
                   <div className="col-2"><button type="button" class="btn btn-light">2</button></div>
                   <div className="col-2"><button type="button" class="btn btn-light">3</button></div>
                   <div className="col-2"><button type="button" class="btn btn-light">4</button></div>
                   <div className="col-2"><button type="button" class="btn btn-light">5</button></div>
                   <div className="col-2"><button type="button" class="btn btn-light">6</button></div>
                   <div className="col-2"><button type="button" class="btn btn-light">7</button></div>
                   <div className="col-2"><button type="button" class="btn btn-light">8</button></div>
                   <div className="col-2"><button type="button" class="btn btn-light">9</button></div>
                   <div className="col-2"><button type="button" class="btn btn-light">10</button></div>
                   <div className="col-2"><button type="button" class="btn btn-light">11</button></div>
                   <div className="col-2"><button type="button" class="btn btn-light">12</button></div> */}

               </div>

           </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handle.bind(this)}>
            Close
          </Button>
          <Button variant="primary" onClick={this.handle.bind(this)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
        </div>
        
        
    )
}



}




export default Movielist;