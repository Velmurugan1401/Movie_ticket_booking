import react,{useState } from 'react'
import './home.css'
import image from './spiderman.jpg'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Buffer} from 'buffer';
import Movielist from './movielist'

var clss = 'd-none'
function Home()
{
    const [show, setShow] = useState(false);
    // listmovies()
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // console.log(window.sessionStorage.getItem('role'))
    if(window.sessionStorage.getItem('role')=='admin'){

        clss ='d-block'
    }
    sessioncheck(window.sessionStorage.getItem('token'))
    // console.log()
    return(
       <div>
           {/* header */}
        <nav class="navbar navbar-expand-lg navbar-dark fixed-top navbar-shrink" id="mainNav">
            <div class="container">
                {/* <a class="navbar-brand" href="#page-top"><img src="assets/img/navbar-logo.svg" alt="..." /></a> */}
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    Menu
                    <svg class="svg-inline--fa fa-bars fa-w-14 ms-1" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bars" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"></path></svg>
                </button>
                <div class="collapse navbar-collapse" id="navbarResponsive">
                    <ul class="navbar-nav text-uppercase ms-auto py-4 py-lg-0">
                        <li className={"nav-item "+clss}><a className="nav-link" onClick={handleShow}>Add Movies</a></li>
                        {/* <li className="nav-item" ><a className="nav-link" href="#services"></a></li> */}
                        <li className="nav-item"><a className="nav-link" href="#portfolio">Portfolio</a></li>
                        <li className="nav-item"><a className="nav-link" href="#about">About</a></li>
                        <li className="nav-item"><a className="nav-link" href="#team">Team</a></li>
                        <li className="nav-item"><a className="nav-link" href="#contact">Contact</a></li>
                    </ul>
                </div>
            </div>
        </nav>
            {/* bosy */}
        <header class="masthead">
            <div class="container">
                {/* <div class="masthead-subheading">Welcome To Our Studio!</div>
                <div class="masthead-heading text-uppercase">It's Nice To Meet You</div>
                <a class="btn btn-primary btn-xl text-uppercase" href="#services">Tell Me More</a> */}
            </div>
        </header>



        {/* section */}

        <section class="page-section bg-light" id="portfolio">
            <div class="container">
                <div class="text-center">
                    <h2 class="section-heading text-uppercase">Now Showing</h2>
                    {/* <h3 class="section-subheading text-muted">Lorem ipsum dolor sit amet consectetur.</h3> */}
                </div>
                
                <div className="row movielist">
                <Movielist />
                   
               
                </div>
            </div>
        </section>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
                <form>
        <div class="form-row row">
            <div class="col-6">
            <lable>Movie Name</lable>
            <input type="text" class="form-control" placeholder="" />
            </div>
            <div class="col-6">
            <lable>Language</lable>
            <input type="text" class="form-control" placeholder="" />
            </div>
            <div class="col-6">
            <lable>Release Date</lable>
            <input type="date" class="form-control" placeholder="" />
            </div>
            <div class="col-6">
            <lable>Duration</lable>
            <input type="text" class="form-control" placeholder="" />
            </div>
            <div class="col-6">
            <lable>Image</lable>
            <input type="file" onChange={uploadinage} class="form-control image"  />
            </div>
            <div class="col-6">
            <lable>End Date</lable>
            <input type="Date" class="form-control"  />
            </div>
            
        </div>
        </form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
       </div>
    )
}


function sessioncheck(data){
    var userobj={
            token:data
   }
   const header=new Headers({'Content-Type':'application/json'});
   const requestOptions = {
       method: 'POST',
       headers: header,
       
       body: JSON.stringify(userobj)
   };
   fetch('http://localhost:2022/api/session',requestOptions)
   .then(response => response.json())
   .then(response => {
    console.log(response)
    //    UserProfile.setName(response)
       if(response.status){
            return true
        // console.log(.email,"sucess")
       }else {
           return false
       }
       
       // console.log(response)
   
   })
}

function menulist(){
    return(
        <div>dssadsa</div>
    )
}


function uploadinage(){
    var calu = document.getElementsByClassName('image')
//   console.log()
  var data = new FormData();
  var imagedata = calu[0].files[0];
  const img = new Buffer(calu[0].files, 'base64')
    console.log(img);
//   console.log(calu[0].files[0].file)
  data.append("data", imagedata);
        var userobj={
            title:"KingKong",
            language:'tamil,english',
            duration:2,
            description:"this movie present on disoney channel",
            endDate:new Date(),
            releaseDate:new Date(),
            image:img,
            token:window.sessionStorage.getItem('token')


        }
        const header=new Headers({'Content-Type':'application/json'});
        const requestOptions = {
        method: 'POST',
        headers: header,
        body: JSON.stringify(userobj)
        };
        fetch('http://localhost:2022/api/movie/add',requestOptions)
        .then(response => response.json())
        .then(response => {
        console.log(response)
        //    UserProfile.setName(response)
        if(response.status){
            // return true
        // console.log(.email,"sucess")
        }else {
        // return false
        }

        // console.log(response)

        })

}


function listmovies(){
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
    console.log(response)
    //    UserProfile.setName(response)
    if(response.status){
        // return(<div>hiii</div>)
    }else {
    // return false
    }

    // console.log(response)

    })
}
export default Home