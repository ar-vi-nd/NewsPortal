import React, { useEffect, useState } from "react";
import Newsitem from "../Newsitem/Newsitem";
import Loadingicon from "../Loading/Loadingicon";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
export default function Newscomponent(props) {


    const [ articles, setarticles ]= useState([])
    const [ pageno, setpageno ] = useState(1)
    const [ pagesize, setpagesize ] = useState(10)
    const [ totalResults, settotalResults ] = useState(0)
    const [ loading, setloading ] = useState(true)



    const updatecontent = async (country, category, apikey, pageno, pagesize) => {

        // console.log(country, " ", category, " ", pageno, " ", pagesize,)


        try {

            props.settopload(5)
            const response = await fetch(
                `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apikey}&page=${pageno}&pageSize=${pagesize}`
            );
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            props.settopload(50)

            const data = await response.json();

            props.settopload(75)

            setarticles(data.articles)
            settotalResults(data.totalResults)
            setloading(false)
            props.settopload(100)

        } catch (error) {
            console.error("Error fetching data:", error);
        }

    }

    useEffect(() => { updatecontent(props.country, props.category, props.apikey, pageno, pagesize) },[]);


    const handlenext = async () => {
        try {

            props.settopload(5)

            setpageno(pageno + 1)

            const response = await fetch(
                `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${pageno + 1}&pageSize=${pagesize}`
            );

            props.settopload(25)

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            props.settopload(50)


            const data = await response.json();

            props.settopload(75)

            setTimeout(() => {
                setarticles(articles.concat(data.articles));
                props.settopload(100)
               
            }, 1000);


        } catch (error) {
            console.error("Error fetching data:", error);
        }

    };



    return (
    
        <div className="container" style={{marginTop:'70px'}}>
            <h2 className="text-center my-4" style={{marginTop:'70px'}}>FakeNews - Top Headlines </h2>
            {(loading) && <Loadingicon />}

            <InfiniteScroll
                dataLength={articles.length}
                next={handlenext}
                // style={{ display: 'flex', flexDirection: 'column-reverse' }} //To put endMessage and loader to the top.
                // inverse={true} //
                hasMore={articles.length < totalResults}
                loader={<Loadingicon />}
                scrollableTarget="scrollableDiv">

                <div className="container">

                    <div className="row">


                        {articles.map((element) => {
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
                                        badgecolor={props.badgecolor}

                                    />
                                </div>

                            );

                        })}

                    </div>
                </div>

            </InfiniteScroll>


        </div>
    );
}



Newscomponent.defaultProps = {

    country: "in",
    category: "general",
    badgecolor: "danger"


}


Newscomponent.propTypes = {

    country: PropTypes.string,
    maxarticlesperpage: PropTypes.number,
    category: PropTypes.string,
    badgecolor: PropTypes.string

}




