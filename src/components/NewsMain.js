import React, { Component } from 'react';
import NewsItem from './NewsItem';

export class NewsMain extends Component {
  constructor() {
    super();
    this.state = {
      topNews: [],
      page: 1,
      loading: false, 
    };
  }

  async componentDidMount() {
    this.setState({ loading: true }); 
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=4bfb6e5d400f414f870886a8c2b5a0ca&page=1&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({ topNews: parsedData.articles, totalNews: parsedData.totalResults, loading: false }); 
  }

  previousNews = async () => {
    this.setState({ loading: true }); 
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=4bfb6e5d400f414f870886a8c2b5a0ca&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({ topNews: parsedData.articles, page: this.state.page - 1, loading: false }); 
  };

  nextNews = async () => {
    if (!(this.state.page + 1 > Math.ceil(this.state.totalNews) / this.props.pageSize)) {
      this.setState({ loading: true }); 
      let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=4bfb6e5d400f414f870886a8c2b5a0ca&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({ topNews: parsedData.articles, page: this.state.page + 1, loading: false }); 
    }
  };

  render() {
    return (
      <div>
        <div className="container my-5">
          <h2>Headlines</h2>
          
          {}
          {this.state.loading ? (
            <div className="d-flex justify-content-center my-5">
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="row">
              {this.state.topNews.map((data, index) => {
                const title = data.title ? data.title.slice(0, 40) : 'No Title Available';
                const desc = data.description ? data.description.slice(0, 80) : 'No Description Available';
                const image = data.urlToImage ? data.urlToImage : 'DefaultImage';
                return (
                  <div className="col-4" key={index}>
                    <NewsItem title={title} desc={desc} image={image} readmore={data.url} />
                  </div>
                );
              })}
            </div>
          )}

          <div className="container d-flex justify-content-between">
            <button
              type="button"
              disabled={this.state.page <= 1 || this.state.loading} 
              className="btn btn-primary"
              onClick={this.previousNews}
            >
              {this.state.loading ? (
                <span>Loading...</span>
              ) : (
                'Previous'
              )}
            </button>
            <button
              type="button"
              disabled={this.state.page + 1 > Math.ceil(this.state.totalNews / this.props.pageSize) || this.state.loading} 
              className="btn btn-primary"
              onClick={this.nextNews}
            >
              {this.state.loading ? (
                <span>Loading...</span>
              ) : (
                'Next'
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsMain;
