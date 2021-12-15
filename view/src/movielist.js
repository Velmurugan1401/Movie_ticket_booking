import { Component } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import moment from 'moment'
import bookmyshow from './bookmyshow.png'

class Movielist extends Component{

    constructor(){
        super();
        this.list = [];
        this.seatlist = []
        this.state = {
            arr : this.list,
            cclas:'d-none',
            show : false,
            seates:this.seatlist,
            dates:'',
            timing:''
            
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
       this.setState({show:true,movieId:event.target.value})

    }


    booktickedlist(event){
        const header=new Headers({'Content-Type':'application/json'});
        const requestOptions = {
        method: 'POST',
        headers: header,
        // session:{sessionObj:},
        body: JSON.stringify({token:window.sessionStorage.getItem('token'),timing:event.target.value,date:this.state.dates,movieId:this.state.movieId})
        };
        fetch('http://localhost:2022/api/reservation/listbooked',requestOptions)
        .then(response => response.json())
        .then(response => {
            if(response.result && response.result.length){

            }else{
                var set = document.getElementsByClassName('seatlist')
                this.setState({cclas:'d-block'})
            }
               
        })
    }


    datechange(evnet){
        // console.log(evnet.target.value)
        this.setState({dates:evnet.target.value})
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
    if(response.status){
        for(var i=0;i<response.result.length;i++){
            this.list.push(  <div class="col-lg-4 col-sm-6 mb-4"><div class="card "  role="button" >
            <img src={bookmyshow}  />
            <h3 className="text-center">{response.result[i].title}</h3>
            <div class="card-body">
                <p class="card-text">{response.result[i].description ? response.result[i].description:'-' }</p>
            
                <button type="button" value={response.result[i]._id} onClick={this.bookticket.bind(this)} class="btn btn-warning text-white">Book</button>
            </div>
            </div></div>)
           
        }
        this.setState({arr:this.list})
    }else {
    }

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
          <Modal.Title>Ticket Booking</Modal.Title>
        </Modal.Header>
        <Modal.Body>
           <div className="container border-bottom">
           <div className=" mb-2"><input type="date" onChange={this.datechange.bind(this)} defaultValue={moment().format("yyyy-MM-DD")}></input></div>
               <div className="row mb-2">
                   <div className="col-2 mb-2"><button type="button" value={7} onClick={this.booktickedlist.bind(this)} class="btn btn-light">07:00 AM</button></div>
                   <div className="col-2"><button type="button" value={10} onClick={this.booktickedlist.bind(this)} class="btn btn-light">10:00 AM</button></div>
                   <div className="col-2"><button type="button" value={13} onClick={this.booktickedlist.bind(this)} class="btn btn-light">01:00 PM</button></div>
                   <div className="col-2"><button type="button" value={15} onClick={this.booktickedlist.bind(this)} class="btn btn-light">03:00 PM</button></div>
                   <div className="col-2"><button type="button" value={18} onClick={this.booktickedlist.bind(this)} class="btn btn-light">06:00 PM</button></div>
                   <div className="col-2"><button type="button" value={21} onClick={this.booktickedlist.bind(this)} class="btn btn-light">09:00 PM</button></div>
                   <div className="col-2"><button type="button" value={12} onClick={this.booktickedlist.bind(this)} class="btn btn-light">12:00 AM</button></div>
                   <div className="col-2"><button type="button" value={3} onClick={this.booktickedlist.bind(this)} class="btn btn-light">03:00 AM</button></div>

               </div>

           </div>
           <div className="container mt-2">
               <div className={"row d-flex "+this.state.cclas}>
                   <div className="col-3 mb-2"><button type="button" value={1} class="btn btn-light text-success">Available</button></div>
                   <div className="col-3"><button type="button" value={2} class="btn btn-light text-success">Available</button></div>
                   <div className="col-3"><button type="button" value={3} class="btn btn-light text-success">Available</button></div>
                   <div className="col-3"><button type="button" value={4} class="btn btn-light text-success">Available</button></div>
                   <div className="col-3 mb-2"><button type="button" value={5} class="btn btn-light text-success">Available</button></div>
                   <div className="col-3"><button type="button" value={6} class="btn btn-light text-success">Available</button></div>
                   <div className="col-3"><button type="button" value={7} class="btn btn-light text-success">Available</button></div>
                   <div className="col-3"><button type="button" value={8} class="btn btn-light text-success">Available</button></div>
                   <div className="col-3"><button type="button" value={9} class="btn btn-light text-success">Available</button></div>
                   <div className="col-3"><button type="button" value={10} class="btn btn-light text-success">Available</button></div>

               </div>

           </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handle.bind(this)}>
            Close
          </Button>
          <Button variant="primary" onClick={this.handle.bind(this)}>
            Book Now
          </Button>
        </Modal.Footer>
      </Modal>
        </div>
        
        
    )
}



}




export default Movielist;