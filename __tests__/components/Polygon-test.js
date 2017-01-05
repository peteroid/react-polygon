import React from 'react'
import renderer from 'react-test-renderer'

import Polygon from '../../src/components/Polygon'

test('Polygon is rendered properly with default props', () => {
  const polygon = renderer.create(
    <Polygon />
  )

  let tree = polygon.toJSON()
  expect(tree).toMatchSnapshot()
})

test('Polygon is rendered properly with different props', () => {
  const sides = [3, 4, 5, 6, 7, 8, 9, 10, 12, 24, 48]
  const sizes = [50, 144, 169, 5354, 9007199254740991]
  const fills = ['#ffffff', '#000000', '#123ABC', '#DEF456']
  const ratioFuncs = [
    n => Array.apply(null, Array(n)).map(i => 1),
    n => Array.apply(null, Array(n)).map(i => 0),
    n => {
      Array.apply(null, Array(n)).map(i => {
        parseInt(Math.sin(i) * 10000) / 10000
      })
    }
  ]

  let polygons = []
  sides.forEach(n => sizes.forEach(size => fills.forEach(fill => ratioFuncs.forEach(ratioFunc => {
    let props = {n, size, fill, ratios: ratioFunc(n)}
    polygons.push(renderer.create(
      <Polygon {...props} />
    ))
  }))))

  let trees = polygons.map(p => p.toJSON())
  trees.forEach(t => {
    expect(t).toMatchSnapshot()
  })
})
