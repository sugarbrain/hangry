import React, { Component } from 'react';
import axios from 'axios';
import Header from '../Header.js';
import Footer from '../Footer.js';
import Logo from '../../images/splash_logo.png';
import HeaderItem from '../HeaderItem.js';
import  MealListView from '../MealListView.js';
import CategoryCard from '../CategoryCard.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faAngleLeft } from '@fortawesome/free-solid-svg-icons';

export default class Restaurant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      model: {
          name: "",
          category: "",
          distance: "",
          image_url: "",
          phone: "",
      },
      meals: []
    }

    this.onClickBack = this.onClickBack.bind(this);
  }

  componentDidMount() {
    const restId = this.props.match.params.id;
    console.log(`Fetching restaurant ${restId}...`);

    axios.get(`https://hangry-api.herokuapp.com/restaurant/${restId}`)
    .then(data => {
        console.log(data);
        this.setState(prevState => ({
            model: data.data
        }));
    }).catch(err => {
        console.log(err);
    });

    axios.get(`https://hangry-api.herokuapp.com/restaurant/${restId}/getMeals`)
    .then(data => {
        console.log(data);
        this.setState(prevState => ({
            meals: data.data
        }));
    }).catch(err => {
        console.log(err);
    });
  }

  onClickBack() {
    window.history.back();
  }
  
  render() {
    return (
      <div className="activity restaurant">
        <Header>
          <div className="activity__header">
            <HeaderItem>
              <FontAwesomeIcon icon={faAngleLeft} onClick={() => this.onClickBack() }/>
            </HeaderItem>
            <img className="activity__header-logo" src={Logo} />
            <HeaderItem>
              <FontAwesomeIcon icon={faSearch} />
            </HeaderItem>
          </div>
        </Header>
        
        <div className="restaurant__box" style={ { backgroundImage: `url(${  this.state.model.image_url })`} }>
            <div className="name">
                { this.state.model.name }
            </div>
            <div className="details">
                { this.state.model.category + " • " + this.state.model.distance + " • " + this.state.model.phone}
            </div>
        </div>

        <div className="activity__section">
          
          <h2 className="padded" >pratos</h2>
          
          <div className="restaurant__meals padded-x">
            {
                this.state.meals.map(meal => {
                    return <MealListView key={meal.id}
                                         id={meal.id}
                                         name={meal.name} 
                                         description={meal.description} 
                                         price={meal.price} 
                                         url={meal.image_url} />
                })
            }
          </div>
        </div>

        <Footer p={this.props.history} />
      </div>
    );
  }
}