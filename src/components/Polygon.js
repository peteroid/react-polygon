var React = require('react')

var Polygon = React.createClass({
  propTypes: {
    n: React.PropTypes.number,
    size: React.PropTypes.number,
    fill: React.PropTypes.string,
    ratios: React.PropTypes.arrayOf(React.PropTypes.number),
    isAnimating: React.PropTypes.bool,
    duration: React.PropTypes.number,
    renderPoint: React.PropTypes.func
  },
  getConst: {
    root2: Math.sqrt(2)
  },
  getDefaultProps: function () {
    return {
      n: 3,
      size: 50,
      fill: "#ad893e",
      ratios: [1, 1, 1],
      isAnimating: true,
      duration: 1000,
      classPrefix: 'r--poly-',
      renderPoint: null
    }
  },
  getInitialState: function () {
    var points = this.caluatePoints(this.props.n, this.props.size, this.props.ratios)
    return {
      newPoints: points,
      oldPoints: points,
      currentPoints: points,
      steps: [],
      currentTicks: 0,
      preTimestamp: -1
    }
  },
  componentWillReceiveProps: function(nextProps) {
    var newPoints = this.caluatePoints(
      nextProps.n || this.props.n,
      nextProps.size || this.props.size,
      nextProps.ratios || this.props.ratios)

    var isChanged = false
    for (var i = 0; i < newPoints.length; i++) {
      if (this.state.oldPoints[i][0] != newPoints[i][0] ||
        this.state.oldPoints[i][1] != newPoints[i][1]) {
        isChanged = true
        break
      }
    }
    if (isChanged) {
      // init animation
      console.log(nextProps.ratios)

      var steps = this.state.currentPoints.map((point, i) => {
        return point.map((value, j) => {
          return (newPoints[i][j] - value) / this.props.duration
        })
      })

      this.setState({
        currentTicks: 0,
        preTimestamp: -1,
        newPoints: newPoints,
        oldPoints: this.state.currentPoints,
        steps: steps
      }, _ => {
        requestAnimationFrame(this.animatePolygon)
      })
    }
  },
  animatePolygon: function (timestamp) {
    if (this.state.currentTicks < this.props.duration) {
      var nextTicks = (this.state.preTimestamp == -1) ? 0 : (this.state.currentTicks - this.state.preTimestamp + timestamp)
      var r = Math.min(1, nextTicks / this.props.duration)
      var currentPoints = this.state.newPoints.map((point, i) => {
        return point.map((value, j) => {
          return r * value + (1 - r) * this.state.oldPoints[i][j]
        })
      })

      this.setState({
        preTimestamp: timestamp,
        currentTicks: nextTicks,
        currentPoints: currentPoints
      }, _ => {
        requestAnimationFrame(this.animatePolygon)
      })
    } else {
      this.setState({
        oldPoints: this.state.newPoints,
        currentPoints: this.state.newPoints
      })
    }
  },
  toRadian: function (deg) {
    return deg /180 * Math.PI
  },
  caluatePoints: function (n, size, ratios) {
    // fix ratios
    for (var i = ratios.length; i < this.props.n; i++) {
      ratios.push(1)
    }

    var x = size / 2
    var y = 0

    var r = size / 2
    var centerAngle = 360 / n
    var points = []
    for (var i = 0; i < n; i++) {
      var innerAngle = centerAngle * i
      var innerAngleRad = this.toRadian(innerAngle)
      var cosInnerAngleRad = Math.cos(innerAngleRad)

      var tangentAngleRad = innerAngleRad / 2
      var sinTangentAngleRad = Math.sin(tangentAngleRad)
      var cosTangentAngleRad = Math.cos(tangentAngleRad)

      var contourSegment = this.getConst.root2 * r * Math.sqrt(1 - cosInnerAngleRad)
      points.push([
        (x + contourSegment * cosTangentAngleRad) * ratios[i] + 
          r * (1 - ratios[i]),
        (y + contourSegment * sinTangentAngleRad) * ratios[i] + 
          r * (1 - ratios[i])
      ])
    }

    return points
  },
  render: function() {
    return (
      <svg width={this.props.size} height={this.props.size} className={this.props.className}>
        <polygon
          className={this.props.classPrefix + "polygon" || (this.props.classPrefix + "svg")}
          points={this.state.currentPoints}
          fill={this.props.fill}>
        </polygon>
        {this.props.renderPoint ?
          this.state.currentPoints.map((_, i) => {
            return (
              <g className={this.props.classPrefix + "point"} key={i}>
                {this.props.renderPoint(_, i)}
              </g>
            )
          }) : ""
        }
      </svg>
    )
  }
})

module.exports = Polygon