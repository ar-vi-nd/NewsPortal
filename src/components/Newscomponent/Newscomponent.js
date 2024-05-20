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
    this.state = { articles: [], firstarticlearraylength: 0, pageno: 1, currentpage: 1, maxarticlesperpage: this.props.maxarticlesperpage, totalResults: 0, changepage: 0, loading: false };
  }

  async componentDidMount() {
    try {
      console.log("insidecomponentdidmount")
      this.setState({ loading: true })
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.pageno}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      // console.log(data);
      this.setState({ articles: data.articles, firstarticlearraylength: data.articles.length, totalResults: data.totalResults, changepage: Math.floor(data.articles.length / this.state.maxarticlesperpage), loading: false });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  handlenext = async () => {
    try {
      const { articles, pageno, changepage } = this.state;
      const { country, category, apikey } = this.props;
  
      if ((this.state.currentpage + 1) * pageno > pageno * changepage) {

        // console.log("inside handlenext")
        // this.setState({ loading: true });
        // console.log("inside handlenext2")
  
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apikey}&page=${pageno + 1}`
        );
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json();
        // console.log("inside handlenext3")

  
        this.setState((prevState) => ({
          articles: [...prevState.articles, ...data.articles],
          pageno: prevState.pageno + 1,
          currentpage: 1,
          loading: false
        }));
      } else {
        this.setState((prevState) => ({
          currentpage: prevState.currentpage + 1
        }));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      this.setState({ loading: false });
    }
  };
  



  render() {

    let { currentpage, articles, maxarticlesperpage } = this.state
    const startindex = ((currentpage - 1) * maxarticlesperpage);
    const endindex = startindex + maxarticlesperpage;
    const currentarticles = articles.slice(0, endindex)


    // { console.log("page no.:", this.state.pageno, " changepage:", this.state.changepage, " currentpage:", this.state.currentpage, " start index:", startindex, " end index:", endindex) }
    // { console.log("current articles:", currentarticles) }
    return (
      <div className="container">
        <h2 className="text-center">FakeNews - Top Headlines </h2>
        {(this.state.loading) && <Loadingicon />}
        <div className="row">
          {/* {console.log("here1 ","totalresults :",this.state.totalResults)} */}

          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.handlenext}
            // style={{ display: 'flex', flexDirection: 'column-reverse' }} //To put endMessage and loader to the top.
            // inverse={true} //
            hasMore={this.state.articles.length<this.state.totalResults}
            loader={<Loadingicon/>}
            scrollableTarget="scrollableDiv"
          >
           {console.log("inside infinite scroll")}
            {currentarticles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
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
                    author={element.author ? element.author : "anonyomuos"}
                    publishedAt={(element.publishedAt)}
                    source={element.source.name}
                    badgecolor={this.props.badgecolor}

                  />
                </div>
              );

            })}
          </InfiniteScroll>

        </div>
      </div>
    );
  }
}



