import React from 'react'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { FlippableCardState } from '../../utils/enums'
import { FilippableCard } from '.'
import { FLIPPABLE_CARD_BACK_TEST_ID, FLIPPABLE_CARD_FRONT_TEST_ID } from './consts'
import { backVariants, frontVariants, paperStyles } from './styles'

const defaultProps = {
  id: 'id',
  cardState: FlippableCardState.FaceDown,
  onClick: () => () => { },
  FrontContent: () => 'front',
  BackContent: () => 'back'
}

describe('FlippableCard', () => {
  test.each([
    ['FaceUp', FlippableCardState.FaceUp],
    ['FaceDown', FlippableCardState.FaceDown],
    ['Removed', FlippableCardState.Removed]
  ])('should show correct side when card state is %s', (_, cardState) => {
    const onClickMock = jest.fn()
    const props = {
      cardState,
      onClick: onClickMock
    }

    render(<FilippableCard {...defaultProps} {...props} />)

    const front = screen.getByTestId(FLIPPABLE_CARD_FRONT_TEST_ID);
    const back = screen.getByTestId(FLIPPABLE_CARD_BACK_TEST_ID);

    expect(front).toHaveStyle(paperStyles);
    expect(back).toHaveStyle(paperStyles);
  })

  // it('should show card back when card is faced down', async () => {
  //   const cardBack = 'test'
  //   const props = {
  //     cardState: FlippableCardState.FaceDown,
  //     cardBack
  //   }

  //   render(<FlippableCard {...defaultProps} {...props} />)

  //   const image = screen.getByTestId('img');

  //   expect(image).toHaveAttribute('src', cardBack);
  // })

  // it('should not show card back when card is hidden', async () => {

  //   render(<FlippableCard {...defaultProps} cardState={FlippableCardState.Removed} />)

  //   const image = screen.queryByRole('img');

  //   expect(image).not.toBeInTheDocument()
  // })
})

