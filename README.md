# react-polygon
A react add-on for drawing polygons for any number of sides, as well as animation

# Demo
[https://peteroid.github.io/react-polygon/](https://peteroid.github.io/react-polygon/)

# Usage
```javascript
npm install react-polygon --save
```

```javascript
var Polygon = require('react-polygon')

// add this to your components
<Polygon />
```


# Build your own
```javascript
npm install
npm run webpack
```

# Props
name : propType = defaultValue

## Basic
- n : number = 3
- size : number = 50
- fill : string = "#ad893e"
- ratios : [number] = [1, 1, 1, 1, 1]

## Animation
- isAnimating : bool = true
- duration : number = 1000

## renderPoint
You can render extra elements on each point by passing a function to the props `renderPoint`. Here is an example for rendering a point on each vertice:

```javascript
var React = require('react')
var Polygon = require('react-polygon')

var MyPolygon = React.createClass({
  renderPoint: function (point) {
    return (
      <circle cx={point[0]} cy={point[1]} r={5} />
    )
  },
  render: function () {
    return (
      <Polygon renderPoint={this.renderPoint} />
    )
  }
})
```
