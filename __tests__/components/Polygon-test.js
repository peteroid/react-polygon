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
