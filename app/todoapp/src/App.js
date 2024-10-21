import logo from './logo.svg';
import './App.css';
import { Component } from 'react';

class App extends Component{

  constructor(props){
    super(props);
    this.state={
      notes:[]
    }
  }

  Api_URL="http://localhost:5103/";

  componentDidMount(){
    this.refreshNotes();
  }

  async refreshNotes(){
    fetch(this.Api_URL+"api/ToDo/GetNotes").then(response => response.json())
    .then(data => {
      this.setState({notes:data})
    })
  }

  async addClick(){
    var newNotes=document.getElementById("newNotes").value;
    const data = new FormData();
    data.append("newNotes",newNotes);
    
    fetch(this.Api_URL+"api/ToDo/AddNotes",{
      method:"POST",
      body:data
    }).then(res=>res.json())
    .then((result)=>{
      alert(result);
      this.refreshNotes();
    })
  }

  async deleteClick(id){
    var newNotes=document.getElementById("newNotes").value;
    const data = new FormData();
    data.append("newNotes",newNotes);
    
    fetch(this.Api_URL+"api/ToDo/DeleteNotes?id="+id,{
      method:"DELETE",
      body:data
    }).then(res=>res.json())
    .then((result)=>{
      alert(result);
      this.refreshNotes();
    })
  }




render() {
  const{notes}=this.state;
  return (
    <div className="App">
      <h2>To-Do App</h2>

      {/* Añadir nuevas notas */}
      <input id="newNotes"/>&nbsp;
      <button onClick={()=>this.addClick()}>Add Notes</button>


      {/* Muestra la lista de notas */}
      {notes.map(note=>
      <p>
        <b>* {note.description} </b>
        <button onClick={()=>this.deleteClick(note.id)}>Delete Note</button>
      </p>


      )}

    </div>
  );
}
}
export default App;
