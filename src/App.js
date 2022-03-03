import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      show: false,
      idCounter: 0,
      tasks: [],
      editTask: {},
    }
  }

  toggleModal = () => {
    let {show} = this.state;
    this.setState({show: !show});
  }

  saveCard=(e)=>{
    let topic= document.getElementById('meetingTopic');
    let timeEst=document.getElementById('estimatedTime');
    let desc=document.getElementById('description');
    let {tasks, idCounter,editTask}=this.state;
    console.log("in saveCArd");
    let newTask = {
      title: topic.value,
      time:timeEst.value,
      description:desc.value
    }
    if(editTask.id){
      let i;
      for(i=0;i<tasks.length;i++){
        if(tasks[i].id===editTask.id){
          newTask.id = editTask.id;
          tasks[i] = newTask;
          break;
        }
      }
    } else {
      idCounter++;
      newTask.id = idCounter;
      tasks.push(newTask);
    }
    this.setState({tasks,idCounter, editTask: {}, show: false});
    e.preventDefault();

  }

  removeCard=(idv)=>{
    let{tasks} =this.state;
    let i;
    for(i=0;i<tasks.length;i++){
      if(tasks[i].id===idv){
        break;
      }
    }
    tasks.splice(i,1);
    this.setState({tasks});

  }

editCArd=(id)=>{
  let{tasks,editTask}=this.state;
  let i;
  for(i=0;i<tasks.length;i++){
    if(tasks[i].id===id){
      editTask = tasks[i];
      break;
    }
  }
  this.setState({editTask, show:true});
}
  renderTask = (task) => {
    let {id, title, description, time} = task;
    return (
      <div key={id} className="card mt-3 me-3 float-start w-25 bg-light">
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p>Time - {time}</p>
          <button className='btn btn-danger' onClick={this.removeCard.bind(this, id)}>Delete</button>
          <button className='btn btn-success ms-3' onClick={this.editCArd.bind(this, id)}>Edit</button>

        </div>
      </div>
    );
  };

  render(){
    let {tasks, show, editTask} = this.state;
    return (
      <>
        <div className="m-3">
          <h2>Today's Meeting Topics</h2>
          <button className='btn btn-primary' onClick={this.toggleModal}>Create New</button>
          {tasks.length === 0 && (
            <p className='mt-4'>You don't have any task's yet.<br/> Once added, it will start apprearing here.</p>
          )}
          <div className='mt-4'>
          {tasks.map((task) =>
            this.renderTask(task)
          )}
          </div>
        </div>
        <Modal
          show={show}
          onHide={this.toggleModal}
          backdrop="static"
          keyboard={false}
          centered={true}
        >
          <Modal.Header closeButton>
            <Modal.Title>Modal title</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="md-form"  onSubmit={this.saveCard}>
              <i className="fas fa-envelope prefix grey-text"></i>
              <div className='inputs mb-3'>
                <label data-error="wrong" data-success="right" htmlFor="meetingTopic">Meeting Topic</label>
                <input id="meetingTopic" defaultValue={editTask.title} className="form-control" placeholder='Your meeting topic here' required/>
              </div>
              <div className='inputs mb-3'>
                <label data-error="wrong" data-success="right" htmlFor="estimatedTime">Estimated Time</label>
                <input type='number' id="estimatedTime" min={0} defaultValue={editTask.time} className="form-control" placeholder='Estimated time in Hrs here' required/>
              </div>
              <div className='inputs mb-3'>
                <label data-error="wrong" data-success="right" htmlFor="description">Description</label>
                <textarea id="description" className="form-control" defaultValue={editTask.description} placeholder='Describe what the meeting is all about' required/>
              </div>
              <div className='saveOrDelBtn mt-4'>
                <button type='submit' className='btn btn-success me-3'>
                  Save
                </button>
                <button type='reset' className='btn btn-warning' onClick={this.toggleModal}>
                  Cancel
                </button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default App;
