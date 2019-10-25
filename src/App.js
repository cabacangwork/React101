import React from 'react';
import { Component } from 'react';
import './../public/css/styles.css'

class App extends Component {
  constructor() {
    super() 
    this.state = { 
      value: '',
      edit: false,
      currentTitle: '',
      currentId: '',
      mockData: [
        {      
          id: '1',      
          title: 'Lorem Ipsum' 
        }, 
        {      
          id: '2',      
          title: 'Nullam Sodales'
        }, 
        {      
          id: '3',      
          title: 'Vivamus Accumsan'
        }, 
        {      
          id: '4',      
          title: 'Sed Elit' 
        }, 
        {      
          id: '5',      
          title: 'Test Qwerty' 
        }
      ]
    }
  }

  renderList = () => {
    return (
      <ul className={this.state.edit ? 'active' : ''}>
          {this.state.mockData.map(items => (          
            <li key={items.id} className=''>
              <span>{items.title}</span>
              <div>          
                <button onClick={(e) => this.editItem(e, items.title, items.id)} disabled={this.state.edit}>Edit</button> 
                <button onClick={(e) => this.deleteItem(e, items.title, items.id)} disabled={this.state.edit}>Delete</button>  
              </div>             
            </li>        
          ))}      
        </ul>
    );
  }

  renderAddForm = () => {
    if (!this.state.edit) {
      return (
        <form onSubmit={this.addItem}>
          <input type="text" name="item" value={this.state.value} onChange={this.onInputChange}/>        
          <button>Add Name</button>
        </form>
      )
    }
  }

  onInputChange = e => {
    this.setState({
      value: e.target.value
    })    
  }

  addItem = e => {
    e.preventDefault();
    if (!this.state.edit) {
      let character = this.state.value;
      let remspace = character.replace(/ /g, "");
      if ((remspace.length)>=1) {
        this.setState({    
          mockData: 
          [...this.state.mockData, 
            { 
              id: Date.now(),        
              title: this.state.value
            }
          ]  
        });
        alert('Succesfully Added');
      }
      else alert('Please Iput Something');
      this.state.value = '';
    }
  }

  editItem (e, itemTitle, itemId) {
    this.setState(
      {
        edit: true,
        currentTitle: itemTitle,
        currentId: itemId
      }
    )
  } 

  renderEditForm = () => {
    if (this.state.edit) {
      return (
        <form onSubmit={(e) =>this.updateSubmit(e)}>
          <input type="text" name="updatedTitle" defaultValue={this.state.currentTitle}/>
          <button>Update</button>
        </form>
      )
    }
  }

  updateSubmit = e => {
    e.preventDefault();
    let character = e.target.updatedTitle.value;
    let remspace = character.replace(/ /g, "");
    let num = this.state.mockData.findIndex(e=>e.id==this.state.currentId);     // find index of element
    let newState = Object.assign({}, this.state);                               // create a copy of the state
    if ((this.state.currentTitle) === (e.target.updatedTitle.value)){
      alert('Nothing Changed');
    }
    else if ((remspace.length)==0) {
      alert('No Value Not Allowed!!!');
    }
    else {
      newState.mockData[num].title = e.target.updatedTitle.value;               // update title based on index element
      this.setState(newState);
      alert('Succesfully Updated!!')
    }
    this.setState({edit: false, activeUl: ''})
  }

  deleteItem = (e, itemTitle, itemId) => {
    let decision = confirm('Are you sure you want to delete' + ' "'  + itemTitle + '" ' + "?");
    if (decision){
      let index = this.state.mockData.findIndex(e=>e.id==itemId);             // find index of element
      let newArray = this.state.mockData.slice();                             // copy arrays from mockData
      newArray.splice(index, 1);
      this.setState({mockData: newArray});
    }
  }
  
  render() {
    return (
      <div className="content-wrapper">
        <h2>Basic CRUD</h2>
        {this.renderAddForm()}
        {this.renderEditForm()}
        {this.renderList()}
      </div>
    )
  }
}

export default App;