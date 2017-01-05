import React, { Component } from 'react'

const MATH_SQUARE_ROOT_OF_2 = Math.sqrt(2)

export default class Polygon extends Component {
  constructor (props) {
    super(props)

    let points = this.caluatePoints(this.props.n, this.props.size, this.props.ratios)

    this.state = {
      newPoints: points,
      oldPoints: points,
      currentPoints: points,
      steps: [],
      currentTicks: 0,
      preTimestamp: -1
    }
  }

  componentWillReceiveProps = (nextProps) => {
    let newPoints = this.caluatePoints(
      nextProps.n || this.props.n,
      nextProps.size || this.props.size,
      nextProps.ratios || this.props.ratios)

    let isChanged = false
    for (let i = 0; i < newPoints.length; i++) {
      if (this.state.oldPoints[i][0] !== newPoints[i][0] ||
        this.state.oldPoints[i][1] !== newPoints[i][1]) {
        isChanged = true
        break
      }
    }

    if (isChanged) {
      // init animation
      let steps = this.state.currentPoints.map((point, i) =>
        point.map((value, j) =>
          (newPoints[i][j] - value) / this.props.duration
        )
      )

      if (this.props.isAnimating) {
        this.setState({
          currentTicks: 0,
          preTimestamp: -1,
          newPoints: newPoints,
          oldPoints: this.state.currentPoints,
          steps
        }, _ => {
          requestAnimationFrame(this.animatePolygon)
        })
      } else {
        this.setState({
          oldPoints: newPoints,
          currentPoints: newPoints
        })
      }
    }
  }

  animatePolygon = (timestamp) => {
    if (this.state.currentTicks < this.props.duration) {
      let nextTicks = (this.state.preTimestamp === -1) ? 0 : (this.state.currentTicks - this.state.preTimestamp + timestamp)
      let r = Math.min(1, nextTicks / this.props.duration)
      let currentPoints = this.state.newPoints.map((point, i) =>
        point.map((value, j) =>
          r * value + (1 - r) * this.state.oldPoints[i][j]
        )
      )

      this.setState({
        preTimestamp: timestamp,
        currentTicks: nextTicks,
        currentPoints
      }, _ => {
        requestAnimationFrame(this.animatePolygon)
      })
    } else {
      this.setState({
        oldPoints: this.state.newPoints,
        currentPoints: this.state.newPoints
      })
    }
  }

  toRadian (deg) {
    return deg / 180 * Math.PI
  }

  caluatePoints (n, size, ratios) {
    Array.apply(null, Array(Math.max(n - ratios.length, 0))).forEach(_ => {
      ratios.push(1)
    })

    let x = size / 2
    let y = 0

    let r = size / 2
    let centerAngle = 360 / n
    let points = []
    for (let i = 0; i < n; i++) {
      let innerAngle = centerAngle * i
      let innerAngleRad = this.toRadian(innerAngle)
      let cosInnerAngleRad = Math.cos(innerAngleRad)

      let tangentAngleRad = innerAngleRad / 2
      let sinTangentAngleRad = Math.sin(tangentAngleRad)
      let cosTangentAngleRad = Math.cos(tangentAngleRad)

      let contourSegment = MATH_SQUARE_ROOT_OF_2 * r * Math.sqrt(1 - cosInnerAngleRad)
      points.push([
        (x + contourSegment * cosTangentAngleRad) * ratios[i] + r * (1 - ratios[i]),
        (y + contourSegment * sinTangentAngleRad) * ratios[i] + r * (1 - ratios[i])
      ])
    }

    return points
  }

  render () {
    return (
      <svg width={this.props.size} height={this.props.size} className={this.props.className}>
        <polygon
          className={this.props.classPrefix + 'polygon' || (this.props.classPrefix + 'svg')}
          points={this.state.currentPoints}
          fill={this.props.fill} />
        {this.props.renderPoint
          ? this.state.currentPoints.map((_, i) =>
            (
              <g className={this.props.classPrefix + 'point'} key={i}>
                {this.props.renderPoint(_, i)}
              </g>
            )
          ) : ''
        }
      </svg>
    )
  }
}

Polygon.defaultProps = {
  n: 3,
  size: 50,
  fill: '#ad893e',
  ratios: [1, 1, 1],
  isAnimating: true,
  duration: 1000,
  classPrefix: 'r--poly-',
  renderPoint: null
}

Polygon.propTypes = {
  n: React.PropTypes.number,
  size: React.PropTypes.number,
  fill: React.PropTypes.string,
  ratios: React.PropTypes.arrayOf(React.PropTypes.number),
  isAnimating: React.PropTypes.bool,
  duration: React.PropTypes.number,
  renderPoint: React.PropTypes.func
}
