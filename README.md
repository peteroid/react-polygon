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

# add this to your components
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
- ratio : [number] = [1, 1, 1, 1, 1]

## Animation
- isAnimating : bool = true
- duration : number = 1000
