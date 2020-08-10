import React, { Component } from "react";


class Form extends React.Component{
  
  constructor(props) {
    super(props);
    this.state = {
      namePoke: '',
      img: '#',
    }
  }
  
  /*
  async componentDidMount(){
    await this.fetchJale()
  }*/

  apiPokemon = async () => {
    let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${this.state.name}`)
    let data = await res.json()

    this.setState({
        namePoke: data.name,
        img: data.sprites.other.dream_world.front_default,
    })
  }
  

  handleName = event => {
    this.setState({
      name: event.target.value
    })
  }
  

  handleSubmit = event =>{
    this.apiPokemon()

    this.setState({
      name: '',
    })
    event.preventDefault()
  }

    render() {
        console.log(this.state)
        return (
        <div className="card text-center">
          
          <div className="card-body">
            <form onSubmit={this.handleSubmit}>    
                <label>Ingrese el pokemon</label><br/>
                <input type="text" placeholder="nombre" value={this.state.name} onChange={this.handleName} />
                <br/>
                <button type="submit" className="btn btn-primary">submit</button>
            </form>

            <div className="container">
                <div className="card-footer text-muted text-center">
                    Resultados
                </div>
                <div className="card" style= {{width: '12rem'}} >
                <img src={this.state.img} className="card-img-top" style={{width: 186, height:200 }} />
                    
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Nombre: {this.state.namePoke}</li>
                    </ul>
                </div>
            </div>
            </div>
        </div>
        );
    }

}


export default Form