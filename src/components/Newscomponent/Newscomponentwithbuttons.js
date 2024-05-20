import React, { Component } from "react";
import Newsitem from "../Newsitem/Newsitem";
import Loadingicon from "../Loading/Loadingicon";
import PropTypes from 'prop-types'
export default class Newscomponent extends Component {

  static defaultProps = {

    country : "in",
    category : "general",
    badgecolor: "danger"


  }

  static propTypes = {

    country : PropTypes.string,
    maxarticlesperpage: PropTypes.number,
    category : PropTypes.string,
    badgecolor: PropTypes.string

  }


  constructor(props) {
    super(props);
    this.state = { articles: [],firstarticlearraylength:0, pageno: 1, currentpage: 1, maxarticlesperpage: this.props.maxarticlesperpage, totalResults: 0, changepage: 0, loading: false };
  }

  async componentDidMount() {
    try {

      this.setState({ loading:true })
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=4a336ec2f3434bb69a21b131f592fe82&page=${this.state.pageno}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      // console.log(data);

      this.setState({ articles: data.articles,firstarticlearraylength:data.articles.length, totalResults: data.totalResults, changepage: Math.floor(data.articles.length / this.state.maxarticlesperpage), loading: false });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  handleprevious = async () => {

    let { articles, pageno, currentpage, maxarticlesperpage, totalResults, changepage } = this.state


    if (currentpage == 1) {

      try {
        this.setState({ loading: true })

        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=4a336ec2f3434bb69a21b131f592fe82&page=${this.state.pageno - 1}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        this.setState({ articles: data.articles, pageno: this.state.pageno - 1, currentpage: changepage, loading: false });
      } catch (error) {
        console.error("Error fetching data:", error);
      }

    }
    else {
      this.setState({ currentpage: this.state.currentpage - 1 })
    }

  }

  handlenext = async () => {



    let { articles, pageno, currentpage, maxarticlesperpage, totalResults, changepage } = this.state

    if (((currentpage + 1) * pageno) > pageno * changepage) {
      try {
        this.setState({ loading: true })

        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=4a336ec2f3434bb69a21b131f592fe82&page=${this.state.pageno + 1}`
        );

        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        this.setState({ articles: data.articles, pageno: this.state.pageno + 1, currentpage: 1, loading: false });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    else {
      this.setState({ currentpage: this.state.currentpage + 1 })
    }

  }

  changeloadingstate = ()=>{
    this.setState({loading : !this.state.loading})
  }



  render() {


    let { currentpage, articles, maxarticlesperpage } = this.state
    const startindex = ((currentpage - 1) * maxarticlesperpage);
    const endindex = startindex + maxarticlesperpage;
    const currentarticles = articles.slice(startindex, endindex)
    
   
    // console.log((((this.state.pageno - 1) * 100) + ((this.state.currentpage - 1) * this.state.maxarticlesperpage) + currentarticles.length) >= this.state.totalResults)
    // console.log((((this.state.pageno - 1) * 100) + ((this.state.currentpage - 1) * this.state.maxarticlesperpage) + currentarticles.length))

    return (
      <div className="container">
            <button className="btn btn-danger" onClick={this.changeloadingstate}>click me</button>
        <h2 className="text-center">FakeNews - Top Headlines </h2>
        {(this.state.loading) && <Loadingicon />}
        <div className="row">
          {currentarticles.map((element) => {
            return (

              
              // i had a issue here and i was thinking why before (this.state.loading ) i'm not using '{' and the answer is because this curly brace will treat it as an object because i'm writing this statement inside curly braces used for currentaritcles.map function
              
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
             

              // also i was facing error as return statement should only return i tag and i was enclosing this whole html in div tag but the closing </div>, I was writing wrong <div/> (i've removed that code
              // it was just <div> tag before (this.state.loading) and a closing </div> tag after </div> tag above)
              // Also you dont even need to wrap it in div tags or <> empty tags




          );
            
          })}
          <div className="container d-flex justify-content-between my-4">

            {/* {console.log("page no.:",this.state.pageno)}
            {console.log("changepage:",this.state.changepage)}
            {console.log("currentpage",this.state.currentpage)}
            {console.log(((this.state.pageno - 1) * this.state.changepage) + this.state.currentpage)}
            {console.log(Math.ceil(this.state.totalResults / this.state.maxarticlesperpage))}
            {console.log("firstarticlearraylength: ",this.state.firstarticlearraylength)}
            {console.log("current articles: ", currentarticles.length)}
            {console.log("disable next on : ",(((this.state.pageno - 1) * (this.state.firstarticlearraylength)) + ((this.state.currentpage - 1) * this.state.maxarticlesperpage) + currentarticles.length))} */}

            <button type="button" className="btn btn-danger" onClick={this.handleprevious} disabled={this.state.pageno == 1 && this.state.currentpage == 1}>&lt;=previous</button>
            <div> Page-{((this.state.pageno - 1) * this.state.changepage) + this.state.currentpage}/{Math.ceil(this.state.totalResults / this.state.maxarticlesperpage)}</div>
            <button type="button" className="btn btn-success" onClick={this.handlenext} disabled={(((this.state.pageno - 1) * (this.state.firstarticlearraylength)) + ((this.state.currentpage - 1) * this.state.maxarticlesperpage) + currentarticles.length) >= this.state.totalResults}>Next =&gt;</button>

          </div>

        </div>
      </div>
    );
  }
}


// this is also a way to set default props and it was overwriting the default props set in the class

// Newscomponent.defaultProps = {
//   maxarticlesperpage: 10,
//   country : "in"
// };


