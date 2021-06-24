import reducer from '../store/reducer'
import GET_FEED from '../store/action'

describe('feed reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual([
      {
        feed: [],
        loading: true
      }
    ])
  })

  it('should handle GET_FEED', () => {
    expect(
      reducer([], {
        type: GET_FEED,
        feed: [],
        loading: true
      })
    ).toEqual([
      {
        feed: [],
      }
    ])

    expect(
      reducer(
        [
          {
            feed: [],
            loading: true
          }
        ],
        {
          type: GET_FEED,
          feed: []
        }
      )
    ).toEqual([
      {
        feed: [],
        loading: true
      },
    ])
  })
})