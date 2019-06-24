import { init } from '@rematch/core'
import connectStore from '../src/'

let store

describe('connect', () => {
	document.body.innerHTML =
		'<div style="transition: all 300ms ease" id="test" class="base-class" data-test="20" data-other="40"></div>'

	beforeEach(() => {
		store = init({
			models: {
				count: {
					state: 0, // initial state
					reducers: {
						increment(state, payload) {
							return state + payload
						}
					}
				}
			}
		})
	})

	it('should be a function', () => {
		expect(connectStore).toBeInstanceOf(Function)
	})

	it('should return a function when called with store and registerFunk', () => {
		const connect = connectStore(store)
		expect(connect).toBeInstanceOf(Function)
	})

	it('should compose modules with just store props', () => {
		const connect = connectStore(store)
		// get the cart state
		const mapState = ({ count }) => ({ count })
		// get all of the point actions
		const mapDispatch = ({ count }) => ({ ...count })

		const mod = ({ store: { increment } }) => {
			increment(2)
		}

		const merge = connect({ mapState, mapDispatch })(mod)

		expect(merge).toBeInstanceOf(Function)

		merge({})

		expect(store.getState().count).toBe(2)
	})
})
