import React from 'react';
import Firebase from 'firebase';
import config from './config';
import 'bootstrap/dist/css/bootstrap.css';
import "./title.scss"
import "./app.css"

class App extends React.Component {

  constructor(props){
    super(props);
    Firebase.initializeApp(config.firebase);

    this.state = {
      players: []
    }
  }

  //write data to firebase
  writeUserData = () => {
    Firebase.database().ref('/').set(this.state);
    console.log('DATA SAVED');
  }

  //retreive data from firebase
  getUserData = () => {
    let ref = Firebase.database().ref('/');
    ref.on('value', snapshot => {
      const state = snapshot.val();
      this.setState(state);
      console.log(this.state.players.sort());
    });
    console.log('DATA RETRIEVED');
  }

  //get data for the first time
  componentDidMount() {
    this.getUserData();
  }
  
  componentDidUpdate(prevProps, prevState) {
    // check on previous state
    // only write when it's different with the new state
    if (prevState !== this.state) {
      this.writeUserData();
    }
  }

  render() {
    const { players } = this.state;
    const title = () => { return(
        <div className="stage">
          <div className="layer"></div>
          <div className="layer"></div>
          <div className="layer"></div>
          <div className="layer"></div>
          <div className="layer"></div>
          <div className="layer"></div>
          <div className="layer"></div>
          <div className="layer"></div>
          <div className="layer"></div>
          <div className="layer"></div>
          <div className="layer"></div>
          <div className="layer"></div>
          <div className="layer"></div>
          <div className="layer"></div>
          <div className="layer"></div>
          <div className="layer"></div>
          <div className="layer"></div>
          <div className="layer"></div>
          <div className="layer"></div>
          <div className="layer"></div>
        </div>
    )};
    let i = 0;
      const listPLayerTable = players.sort((a, b) => {
        if (a.score > b.score) return -1;
        else if (a.score < b.score) return 1;
        else return 0
      })
          .map(player =>
          <tr key={player.uid}>
            <th>{i = i+1}</th>
            <th scope="row">{player.name}</th>
            <th>{player.score}</th>
          </tr>
        );
    return(
      <div className="container-fluid ">
        <div className="row">
          <div className='col-xl-12'>
            <h1 align="center" className="title">{title()}</h1>
          </div>
        </div>
        <div className='row'>
          <table className="table">
          <thead>
            <tr className="trow100 head">
              <th scope="col">#</th>
              <th scope="col">Team Name</th>
              <th scope="col">Score</th>
            </tr>
          </thead>
          <tbody>
            {listPLayerTable}
          </tbody>
          </table>
        </div>
        {/* <div className='row'>
          <div className='col-xl-12'>
            <h1>Add new player here</h1>
            <form onSubmit={ this.handleSubmit }>
              <div className="form-row">
                <input type='hidden' ref='uid' />
                <div className="form-group col-md-6">
                  <label>Name</label>
                  <input type="text" ref='name' className="form-control" placeholder="Name" />
                </div>
                <div className="form-group col-md-6">
                  <label>Score</label>
                  <input type="text" ref='score' className="form-control" placeholder="Score" />
                </div>
              </div>
              <button type="submit" className="btn btn-primary">Save</button>
            </form>
          </div>
        </div> */}
      </div>
    )
  }

}

export default App;
