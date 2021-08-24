import { render, screen } from '@testing-library/react'
import Map from '.'

describe('<Map />', () => {
  it('should render without any marker', () => {
    render(<Map />)
    expect(
      screen.getByRole('link', {
        name: /a js library for interactive maps/i
      })
    ).toBeInTheDocument()
  })
  it('shoulder render with marker in correct place', () => {
    const place = {
      id: '1',
      name: 'Salvador',
      slug: 'ssa',
      location: {
        latitude: 0,
        longitude: 0
      }
    }

    const placeTwo = {
      id: '2',
      name: 'cepa',
      slug: 'SP',
      location: {
        latitude: 120,
        longitude: 20
      }
    }
    render(<Map places={[place, placeTwo]} />)

    expect(screen.getByTitle(/salvador/i)).toBeInTheDocument()
    expect(screen.getByTitle(/cepa/i)).toBeInTheDocument()
  })
})
