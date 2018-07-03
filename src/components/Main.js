import React, { Component } from 'react'
import Polygon from './Polygon'

export default class Main extends Component {
  constructor (props) {
    super(props)

    this.state = {
      ratio: [],
      ratio2: [],
      duration: 2000
    }
  }

  componentDidMount = () => {
    setInterval(() => {
      this.setState({
        ratio: this.getRandomRatios()
      })
    }, this.state.duration)

    setInterval(() => {
      this.setState({
        ratio2: this.getRandomRatios()
      })
    }, this.state.duration / 3 * 2)
  }

  getRandomRatios () {
    return Array.apply(null, Array(this.props.n)).map(() =>
      Math.random() * 0.7 + 0.3
    )
  }

  renderPoint (point) {
    return (
      <circle cx={point[0]} cy={point[1]} r={5} />
    )
  }

  render () {
    return (
      <div className='main'>
        <section>
          <h1>
            {'Animating everything !'}
          </h1>
          <h2>
            {'ratios={[number]}'}
          </h2>
          <div className='container'>
            <Polygon n={this.props.n}
              ratios={this.state.ratio2}
              size={200}
              fill='#0f0'
              className='my-polygon-2' />
            <Polygon n={this.props.n}
              ratios={this.state.ratio}
              size={200}
              className='my-polygon-2'
              fill='#f00'
              renderPoint={this.renderPoint} />
            <Polygon n={this.props.n} size={200} className='my-polygon-3' />
          </div>
          <div>
            <small className='grey'>Did we mention the hexagon background is also react-polygon?</small>
          </div>
        </section>
        <section>
          <h1>
            {'Give it a point ;)'}
          </h1>
          <h2>
            {'renderPoint={func}'}
          </h2>
          <Polygon n={5} size={150} renderPoint={this.renderPoint} />
        </section>
        <section>
          <h1>
            {'Rock with your css!'}
          </h1>
          <h2>
            {'n={10}, ratios={[1, 0.4, 1, 0.4, 1, 0.4, 1, 0.4, 1, 0.4]}'}
          </h2>
          <Polygon n={10} size={120} ratios={[1, 0.4, 1, 0.4, 1, 0.4, 1, 0.4, 1, 0.4]}
            className='my-polygon-1' />
        </section>
      </div>
    )
  }
}

Main.defaultProps = {
  n: 7
}
