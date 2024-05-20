import React, { Component } from "react";
import Newsitem from "../Newsitem/Newsitem";
import Loadingicon from "../Loading/Loadingicon";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
export default class Newscomponent extends Component {

  static defaultProps = {

    country: "in",
    category: "general",
    badgecolor: "danger"


  }

  static propTypes = {

    country: PropTypes.string,
    maxarticlesperpage: PropTypes.number,
    category: PropTypes.string,
    badgecolor: PropTypes.string

  }


  constructor(props) {
    super(props);
    this.state = { articles: [], pageno: 1,pagesize:5,totalResults:0, loading: false };
  }

  updatecontent = async (country,category,apikey,pageno,pagesize)=>{

    console.log(country," ",category," ",pageno," ",pagesize,)

    
    try {
        console.log("insidecomponentdidmount")
        this.setState({ loading: true })
        console.log("loading",this.state.loading)
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apikey}&page=${pageno}&pageSize=${pagesize}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        this.setState({ articles: data.articles, totalResults: data.totalResults, loading: false });
      } catch (error) {
        console.error("Error fetching data:", error);
      }


  }

  async componentDidMount() {
   this.updatecontent(this.props.country,this.props.category,this.props.apikey,this.state.pageno,this.state.pagesize)
  }

  handleprev = async () => {

// this.setState({pageno:this.state.pageno+1})
//  this wont update the pageno immediately so sending this.state.pageno in updatecontent will show you the same page

this.setState({pageno:this.state.pageno-1})

this.updatecontent(this.props.country,this.props.category,this.props.apikey,this.state.pageno-1,this.state.pagesize)
  };
  handlenext = async () => {


    this.setState({pageno:this.state.pageno+1})
this.updatecontent(this.props.country,this.props.category,this.props.apikey,this.state.pageno+1,this.state.pagesize)
  };
  



  render() {

    console.log(this.state.loading)

    return (
        <div className="container">
              <button className="btn btn-danger" onClick={this.changeloadingstate}>click me</button>
          <h2 className="text-center">FakeNews - Top Headlines </h2>
          {(this.state.loading) && <Loadingicon />}
          <div className="row">
            {this.state.articles.map((element) => {
              return (                
                (!this.state.loading) && <div className="col-md-4" key={element.url}>
                  <Newsitem
                    title={element.title ? element.title : "Breaking News"}
                    description={
                      element.description ? element.description : "Read More"
                    }
                    imageurl={
                      element.urlToImage
                        ? element.urlToImage
                        : "https://images.wsj.net/im-911438/social"
                    }
                    newsurl={element.url ? element.url : ""}
                    author = {element.author?element.author:"anonyomuos"}
                    publishedAt = {(element.publishedAt)}
                    source  = {element.source.name}
                    badgecolor={this.props.badgecolor}
  
                  />
                </div>
  
            );
              
            })}
            <div className="container d-flex justify-content-between my-4">
  
              <button type="button" className="btn btn-danger" onClick={this.handleprev} disabled={this.state.pageno == 1}>&lt;=previous</button>
              <div> Page-{this.state.pageno}/{Math.ceil(this.state.totalResults / this.state.pagesize)}</div>
              <button type="button" className="btn btn-success" onClick={this.handlenext} disabled={this.state.pageno==Math.ceil(this.state.totalResults/this.state.pagesize)}>Next =&gt;</button>
  
            </div>
  
          </div>
        </div>
      );
    }
  }




