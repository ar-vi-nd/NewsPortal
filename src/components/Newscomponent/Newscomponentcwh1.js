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
        this.state = { articles: [], pageno: 1, pagesize: 10, totalResults: 0, loading: true, counter: 0 };
    }



    // updatecontent = async (country, category, apikey, pageno, pagesize) => {

    //     console.log(country, " ", category, " ", pageno, " ", pagesize,)
    //     // this.setState({ loading: false })
    //     const response = await fetch(
    //         `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apikey}&page=${pageno}&pageSize=${pagesize}`
    //     );
    //     // const data = await response.json();
    //     // console.log(data);
    //     // console.log(this.state.articles)
    //     // console.log(data.articles)
    //     this.setState({
    //         // articles:(data.articles),
    //         // totalResults: data.totalResults,
    //         loading: false,
    //         counter: this.state.counter + 1
    //     }, () => {
    //         console.log(this.state.counter);
    //     });
    // }

    // in this case
    // first render() will be called twice
    // then component mounted will be printed and then console.log(country, " ", category, " ", pageno, " ", pagesize,) twice
    // since there is a fetch false 1 false 1 1 then false 2 false 2 will be printed


    updatecontent = async (country, category, apikey, pageno, pagesize) => {
        console.log(country, " ", category, " ", pageno, " ", pagesize,)
        this.setState({ loading: true })
        const response = await fetch(
            `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apikey}&page=${pageno}&pageSize=${pagesize}`
        );
        const data = await response.json();
        console.log(data);
        // console.log(this.state.articles)
        // console.log(data.articles)
        this.setState({
            // articles:(data.articles),
            // totalResults: data.totalResults,
            loading: true,
            counter: this.state.counter + 1
        }, () => {
            console.log(this.state.counter);
        });
    }

       // first render() will be called twice
    // then component mounted will be printed and then console.log(country, " ", category, " ", pageno, " ", pagesize,) twice
    // then true 0 twice
    // since there is a fetch true 0 twice
    // true 1 true 1 1 then true 2 true 2 will be printed

    // updatecontent = async (country, category, apikey, pageno, pagesize) => {
    //     console.log(country, " ", category, " ", pageno, " ", pagesize,)

    //     // const data = await response.json();
    //     // console.log(data);
    //     // console.log(this.state.articles)
    //     // console.log(data.articles)
    //     this.setState({
    //         // articles:(data.articles),
    //         // totalResults: data.totalResults,
    //         loading: false,
    //         counter: this.state.counter + 1
    //     }, () => {
    //         console.log(this.state.counter);
    //     });
    // }

        // first render() will be called twice
    // then component mounted will be printed and then console.log(country, " ", category, " ", pageno, " ", pagesize,) twice
    // since there is a fetch false 1 false 1 1 1

  


    // updatecontent = async (country, category, apikey, pageno, pagesize) => {
    //     console.log(country, " ", category, " ", pageno, " ", pagesize,)

    //     this.setState({ loading: false })
    //     // const data = await response.json();
    //     // console.log(data);
    //     // console.log(this.state.articles)
    //     // console.log(data.articles)
    //     this.setState({
    //         // articles:(data.articles),
    //         // totalResults: data.totalResults,
    //         loading: true,
    //         counter: this.state.counter + 1
    //     }, () => {
    //         console.log(this.state.counter);
    //     });
    // }

            // first render() will be called twice
    // then component mounted will be printed and then console.log(country, " ", category, " ", pageno, " ", pagesize,) twice
    // true 1 true1 1 1





// okay is case me aisa kyu ho raha hai samajhte hai
// jis case me setstate loading ke liye aur fetch aur setstate baakiyo ke liye bhi hai us case me loading wali line run hogi fir uske next line , since setstate asynchronous hai agar next line me loading console log karwaunga toh 
// old value hi show karega
// ab next line pe fetch hai toh vaha control rukega lekin tb tk loading wala async fn complete ho gaya hoga toh vo rerender krwadega aur us time values print karwa dega
// ab fetch bhi result le aaya hoga toh control aage jayga , agar ab loading console log karwaynge toh new value print karega 
// uske baad firse setstate hai jo run hoga values update karega aur print karega

// but since update function ko do baar call ki thi toh do bar karega yeh sb lekin dusri baar iske pass this.state me phele se hi values hongi toh unka use bhi kar sakta hai
// like first time articles array me articles aa jaynge toh next time yeh use kr sakta hai







    componentDidMount() {
        console.log("component mounted")
        this.updatecontent(this.props.country, this.props.category, this.props.apikey, this.state.pageno, this.state.pagesize)
    }








    render() {

        console.log(this.state.loading)
        console.log(this.state.counter)
        //    console.log(this.state.articles.length," ",this.state.totalResults) 
        return (
            <></>
        )
    }




}