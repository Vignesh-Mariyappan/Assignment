import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import RocketLaunchDetails from './components/RocketLaunchDetails';
import querystring from 'querystring';
import './index.css';

//API end point for the first-time page load without any Filters:default api

const API_BASE_URL = "https://api.spacexdata.com/v3/launches?limit=100";

class App extends React.Component{

  //inside the constructor we can declare the state variable and this will take 
  //some properties which is props here
  constructor(props) {
    super(props);

    //declaring state

    this.state = {
      //sources from api here is items which is an empty array,array can store objects,number,string,boolean etc..
      items: [],
      //when the applicatins loads for the first time initial loading false
      isLoaded: false,
      //an object for filters the values from api 
      filters: {
        limit: 15,
        launch_year: undefined,
        launch_success: undefined,
        land_success: undefined,
      },
    }

  }
//for getting Api Updated url using stringify-
//The querystring.stringify() method is used to produce an URL query string from the given
// object that contains the key-value pairs. 

  getUpdatedApiUrl(filters = {}) {
    return API_BASE_URL + querystring.stringify({ ...filters });
  }

  //fetching Api using fetch inbuilt method

  fetchAPI(filters) {
    const URL = this.getUpdatedApiUrl(filters);

    //setting state before loading is false

    this.setState({ isLoaded: false, filters });

    //  function get request
    //fetch method for to fetch api 

      fetch(URL)
      .then(response => response.json())  //need the oject to JSON so we use .json()method
       
      //update the state using setState method() and data we get
      .then(data => {
        this.setState({
          isLoaded: true,
          data
        });
      });
  }
   
  //inbuilt lifecycle method for fetch the api data
  componentDidMount() {
    this.fetchAPI(this.state.filters);
  }

  updateApiFilters(type, value) {
    // if same value is clicked, we remove that filter
    if (this.state.filters[type] === value) {
      value = undefined;
    }

    const filters = {
      ...this.state.filters,
      [type]: value,
    };

    this.fetchAPI(filters);
  }

  //render method 
    render() {

      //we need state variable so used destructuring and we get two variable data and isLoaded from state.
    const { isLoaded, data } = this.state;
    //created new Array and get and fill and map method to interate every element in an array.
    const uniqueLaunchYears = new Array(16).fill(0).map((_, index) => 2006 + index);
    
    if (!isLoaded) {
      return <div className="App-loader-container">
        <div className="App-loader-box">
          
        </div>
      </div>
    }

    else {

      return (
        <div className="App">
          <h1 className="App-header">SpaceX Launch Programs</h1>
          {/* //using bootstrap */}
          <Container fluid> 
            <Row>
              <Col xs={12} sm={12} md={6} lg={3}>
                <Card className="App-filter-card">
                  <Card.Body>
                    <Card.Title className="App-filter-header">
                      Filters
                    </Card.Title>
                    <Card.Text className="App-filter-heading-launch-year">
                      Launch Year
                      <hr className="App-filters-hr" />
                    </Card.Text>
                   {/* Map through uniqueLaunchYear array and get years and create a button for 
                   evey year */}
                    <Row>
                      <div className="App-filter-button-container">
                        {uniqueLaunchYears.map((year) => {
                          return (
                            <Button
                              className="App-filter-button"
                              // used terinary operator 
                              variant={
                                this.state.filters.launch_year ===
                                year.toString()
                                  ? "success"
                                  : "outline-success"
                              }
                              //setting the value to button
                              value={year}
                              //onClick Event done for filter through the year and sending argument
                              // as launch year and button value
                              onClick={(e) =>
                                this.updateApiFilters(
                                  "launch_year",
                                  e.target.value
                                )
                              }
                            >
                              {/* rendering the Years */}
                              {year}
                            </Button>
                          );
                        })}
                      </div>
                    </Row>
                    {/* Sucessful launch filters */}
                    <Card.Text className="App-filter-heading">
                      Successful Launch
                      <hr className="App-filters-hr" />
                    </Card.Text>

                    <div className="App-filter-button-container">
                      <Button
                        className="App-filter-button"
                        // terinary operator for true
                        variant={
                          this.state.filters.launch_success === "true"
                            ? "success"
                            : "outline-success"
                        }
                        //onClick Event done for filter through successful launch and sending argument
                              // as launch sucess and button value
                        onClick={(e) =>
                          this.updateApiFilters(
                            "launch_success",
                            e.target.value
                          )
                        }
                        value="true"
                      >
                        True
                      </Button>

                      <Button
                        className="App-filter-button"
                        // terinary operator for false
                        variant={
                          this.state.filters.launch_success === "false"
                            ? "success"
                            : "outline-success"
                        }
                        onClick={(e) =>
                          this.updateApiFilters(
                            "launch_success",
                            e.target.value
                          )
                        }
                        value="false"
                      >
                        False
                      </Button>
                    </div>

                    {/* Sucessful launch filters */}

                    <Card.Text className="App-filter-heading">
                      Successful Landing
                      <hr className="App-filters-hr" />
                    </Card.Text>
                    <div className="App-filter-button-container">
                      <Button
                        className="App-filter-button"
                         // terinary operator for true
                        variant={
                          this.state.filters.land_success === "true"
                            ? "success"
                            : "outline-success"
                        }
                        //onClick Event done for filter through successful land and sending argument
                              // as land sucess and button value
                        onClick={(e) =>
                          this.updateApiFilters("land_success", e.target.value)
                        }
                        value="true"
                      >
                        True
                      </Button>

                      <Button
                        className="App-filter-button"
                         // terinary operator for false
                        variant={
                          this.state.filters.land_success === "false"
                            ? "success"
                            : "outline-success"
                        }
                        //onClick Event done for filter through successful land false and sending argument
                              // as land sucess and button value
                        onClick={(e) =>
                          this.updateApiFilters("land_success", e.target.value)
                        }
                        value="false"
                      >
                        False
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              <Col xs={12} sm={12} md={6} lg={9}>
                <Row>
                  {/* Using Map function iterate to every api data and get the details
                   and display the api data according to the filter */}
                  {data.map((details) => {
                    return (
                      <Col md={12} lg={4}>
                        <RocketLaunchDetails details={details} />
                      </Col>
                    );
                  })}
                </Row>
              </Col>
            </Row>
            <div>
              <h5 className="App-Developers-name">
                Developer:vignesh M ,7010647248
              </h5>
            </div>
          </Container>
        </div>
      );
    }

  }
}

export default App;
