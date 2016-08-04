var React = require('react')

var Pentagon = React.createClass({
  propTypes: {
    size: React.PropTypes.number,
    fill: React.PropTypes.string,
    ratios: React.PropTypes.arrayOf(React.PropTypes.number),
    isAnimating: React.PropTypes.bool,
    duration: React.PropTypes.number
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
      duration: 1000
    }
  },
  getInitialState: function () {
    var points = this.caluatePoints(this.props.n, this.props.size, this.props.ratios)
    return {
      newPoints: points,
      oldPoints: points,
      polygonAnimate: null
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
      this.setState({
        newPoints: newPoints
      }, function () {
        this._animate.beginElement()
        setTimeout(function () {
          this.setState({
            oldPoints: newPoints
          })
        }.bind(this), this.props.isAnimating ? this.props.duration : 0)
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
        <polygon points={this.state.oldPoints} fill={this.props.fill}>
          <animate
            ref={a => this._animate = a}
            id="polygon-animate"
            attributeName="points" 
            from={this.state.oldPoints}
            to={this.state.newPoints}
            dur={this.props.duration * 1.05 + "ms"}
            begin="indefinite" />
        </polygon>
      </svg>
    )
  }
})

module.exports = Pentagon