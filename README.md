# react-pentagon
A simple react add-on to help drawing the svg pentagon.

# Demo
[https://peteroid.github.io/react-pentagon/](https://peteroid.github.io/react-pentagon/)

# Usage
```javascript
npm install react-pentagon --save
```

```javascript
var Pentagon = require('react-pentagon')

# add this to your components
<Pentagon />
```


# Build your own
```javascript
npm install
npm run webpack
```

# Props
name : propType = defaultValue

## Basic
- size : number = 50
- fill : string = "#ad893e"
- ratio : [number] = [1, 1, 1, 1, 1]

## Animation
- isAnimating : bool = true
- duration : number = 1000
