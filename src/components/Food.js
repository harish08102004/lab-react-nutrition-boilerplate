import React, { Component } from "react";
import FoodData from "../resources/FoodData";
import '../App.css'

class FoodBox extends Component {
    constructor(props){
        super(props)

        this.state = {
          values: {},
          filteredData: FoodData
        }
        this.handleSearch = this.handleSearch.bind(this);
    }

    updateItemValue(id, newValue) {
        this.setState(prevState => ({
            values: {
                ...prevState.values,
                [id]: newValue
            }
        }));
        console.log(this.state.values)
    }

    handleControl(id){
        const input=document.getElementById(`input-${id}`);
        const newValue = parseInt(input.value);
        this.updateItemValue(id, newValue);
    }
    handleReset(id){
        this.updateItemValue(id, 0);
    }
    handleSearch(e) {
      const keyword = e.target.value.toLowerCase();
      const filteredData = FoodData.filter(data => data.name.toLowerCase().includes(keyword));
      this.setState({ filteredData });
    }    
    render() {
        return (
          <div>
            <h3>Search</h3>
            <input type="text" id="search" onChange={this.handleSearch}/>
            {this.state.filteredData.map((data) => (
              <div className="box" key={data.id}>
                <div className="media">
                  <img src={data.img} alt="" width="60px" />
                  <div>
                    <h3>{data.name}</h3>
                    <h6>{data.cal}</h6>
                  </div>
                  <div>
                    <input type="number" min="0" id={`input-${data.id}`} />
                    <button className="control" onClick={() => this.handleControl(data.id)}>+</button>
                  </div>
                </div>
                <div className="content">
                  <h5>{this.state.values[data.id] || 0} {data.name}={this.state.values[data.id] * data.cal || 0} Cal</h5>
                  <button className="reset" onClick={()=>this.handleReset(data.id)}>Reset</button>
                </div>
              </div>
            ))}
          </div>
        );
    }
}

export default FoodBox;