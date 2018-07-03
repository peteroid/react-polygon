[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/) [![Build Status](https://travis-ci.org/peteroid/react-polygon.svg?branch=master)](https://travis-ci.org/peteroid/react-polygon) [![npm version](https://badge.fury.io/js/react-polygon.svg)](https://badge.fury.io/js/react-polygon)

# [![react-polygon](https://png.icons8.com/nolan/40/ff723f/polygon.png)](https://peteroid.github.io/react-polygon/) react-polygon
A react add-on for drawing polygons for any number of sides, as well as animation

# Demo
[https://peteroid.github.io/react-polygon/](https://peteroid.github.io/react-polygon/)

# Usage
```javascript
npm install react-polygon --save
```

```javascript
import Polygon from 'react-polygon'

// add this to your components
<Polygon />
```


# Build your own
```javascript
npm install
npm run webpack
```

# Props
_name : propType = defaultValue_

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
import React, { Component } from 'react'
import Polygon from 'react-polygon'

class MyPolygon extends Component {
  myRenderPoint (point) {
    return (
      <circle cx={point[0]} cy={point[1]} r={5} />
    )
  }

  render () {
    return (
      <Polygon renderPoint={this.myRenderPoint} />
    )
  }
}
```

# Credits
- logo by [Icons8]("https://icons8.com")
