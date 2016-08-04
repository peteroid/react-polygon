var React = require('react')
var Polygon = require('./Polygon')

var Main = React.createClass({
  randomizeRatio: function () {
    this.setState({
      ratio: (
        Array.apply(null, Array(this.props.n)).map(function () {
          return Math.random()
        })
      )
    })
  },
  getDefaultProps: function () {
    return {
      n: 8
    }
  },
  getInitialState: function () {
    return {
      ratio: [],
      duration: 1000
    }
  },
  componentDidMount: function () {
    setInterval(function () {
      this.randomizeRatio()
    }.bind(this), this.state.duration)
  },
  render: function () {
    return (
      <div className="main">
        <section>
          <h1>
            {"ratio={[number]}"}
          </h1>
          <div className="container">
            <Polygon n={this.props.n} ratios={this.state.ratio} size={400} className="my-polygon-2"/>
            <Polygon n={this.props.n} size={400} className="my-polygon-3"/>
          </div>
        </section>
        <section>
          <h1>
            {"Rock with your css!"}
          </h1>
          <h2>
            {"n={10}, ratios={[1, 0.4, 1, 0.4, 1, 0.4, 1, 0.4, 1, 0.4]}"}
          </h2>
          <Polygon n={10} size={120} ratios={[1, 0.4, 1, 0.4, 1, 0.4, 1, 0.4, 1, 0.4]}
            className="my-polygon-1" />
        </section>
      </div>
    )
  }
})

module.exports = Main