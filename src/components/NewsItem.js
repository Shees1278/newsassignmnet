import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
     let {title, desc, image, readmore} = this.props
    return (
            <div className="card my-5" style={{width: "18rem"}}>
                <img src={image} className="card-img-top" alt="..." height={140}/>
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{desc}...</p>
                    <a href={readmore} className="btn btn-primary">Read More...</a>
                </div>
            </div>
    )
  }
}

export default NewsItem
