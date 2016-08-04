var React = require('react')

var Pentagon = React.createClass({
  propTypes: {
    size: React.PropTypes.number,
    fill: React.PropTypes.string,
    ratio: React.PropTypes.arrayOf(React.PropTypes.number),
    isAnimating: React.PropTypes.bool,
    duration: React.PropTypes.number
  },
  getDefaultProps: function () {
    return {
      size: 50,
      fill: "#ad893e",
      ratio: [1, 1, 1, 1, 1],
      isAnimating: true,
      duration: 1000
    }
  },
  getInitialState: function () {
    var points = this.caluatePoints(this.props.size, this.props.ratio)
    return {
      newPoints: points,
      oldPoints: points,
      polygonAnimate: null
    }
  },
  componentWillReceiveProps: function(nextProps) {
    var newPoints = this.caluatePoints(nextProps.size || this.props.size, nextProps.ratio || this.props.ratio)
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
  caluatePoints: function (size, ratios) {
    var x = size / 2
    var _36R = this.toRadian(36)
    var _18R = this.toRadian(18)
    var sin18D = Math.sin(_18R)
    var cos18D = Math.cos(_18R)

    var xTan36D = Math.tan(_36R) * x
    var xOverCos36D = x / Math.cos(_36R)
    var points = [
      {
        x: x,
        y: 0
      },{
        x: x * 2,
        y: xTan36D
      },{
        x: xOverCos36D * (sin18D + 1),
        y: xOverCos36D * cos18D + xTan36D
      },{
        x: xOverCos36D * sin18D,
        y: xOverCos36D * cos18D + xTan36D
      },{
        x: 0,
        y: xTan36D
      }
    ]

    var c = this.caluateMidPoint(x)

    var returnPoints = points.map((p, index) => {
      return [
        p.x * ratios[index] + c.cx * (1 - ratios[index]),
        p.y * ratios[index] + c.cy * (1 - ratios[index])
      ]
    })
    return returnPoints
  },
  caluateMidPoint: function (x) {
    return {
      cx: x,
      cy: x / Math.cos(this.toRadian(36)) / Math.sin(this.toRadian(72)) * Math.sin(this.toRadian(54))
    }
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