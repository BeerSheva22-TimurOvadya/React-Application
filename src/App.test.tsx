import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { matrixSum, range } from './util/number-functions';
import LifeMatrix from './service/LifeMatrix';

test('sum of matrix', () => {
    expect(
        matrixSum([
            [1, 2, 3],
            [4, 5, 6],
        ]),
    ).toBe(21);
});

test('range test', () => {
    expect(range(1, 3)).toEqual([1, 2]);
});


test('2x2 square stays static', () => {
    const initialMatrix = [
        [0, 0, 0, 0],
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0]
    ];
    const lifeMatrix = new LifeMatrix(initialMatrix);

    expect(lifeMatrix.next()).toEqual(initialMatrix);
    expect(lifeMatrix.next()).toEqual(initialMatrix);
});


test('vertical 3x1 stick flips to horizontal and back', () => {
    const verticalStick = [
      [0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0]
    ];

    const horizontalStick = [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 1, 1, 1, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0]
    ];
    const lifeMatrix = new LifeMatrix(verticalStick);

    expect(lifeMatrix.next()).toEqual(horizontalStick);
    expect(lifeMatrix.next()).toEqual(verticalStick);
});
