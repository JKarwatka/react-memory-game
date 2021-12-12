import React from 'react'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MemoryCard } from '.'
import { MemoryCardState } from '../../utils/enums'

const defaultProps = {
  id: 'id',
  cardState: MemoryCardState.FaceDown,
  img: 'img',
  onClick: () => () => { },
  cardBack: 'cardBack'
}

describe('MemoryCard', () => {
  it('should show correct image when card is faced up', async () => {
    const img = 'test'
    const props = {
      cardState: MemoryCardState.FaceUp,
      img
    }

    render(<MemoryCard {...defaultProps} {...props} />)

    const image = screen.getByRole('img');

    expect(image).toHaveAttribute('src', img);
  })

  it('should show card back when card is faced down', async () => {
    const cardBack = 'test'
    const props = {
      cardState: MemoryCardState.FaceDown,
      cardBack
    }

    render(<MemoryCard {...defaultProps} {...props} />)

    const image = screen.getByRole('img');

    expect(image).toHaveAttribute('src', cardBack);
  })

  it('should not show card back when card is hidden', async () => {

    render(<MemoryCard {...defaultProps} cardState={MemoryCardState.Removed} />)

    const image = screen.queryByRole('img');

    expect(image).not.toBeInTheDocument()
  })
})

