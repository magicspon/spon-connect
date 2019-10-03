import { init } from '@rematch/core'
import connectStore from '.'

describe('connect', () => {
	document.body.innerHTML =
		'<div style="transition: all 300ms ease" id="test" class="base-class" data-test="20" data-other="40"></div>'
	let store

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

	it('should return a function when connectStore is called with the store', () => {
		const connect = connectStore(store)
		expect(connect).toBeInstanceOf(Function)
	})

	it('should compose modules with just store props', () => {
		const connect = connectStore(store)
		// get the cart state
		const mapState = ({ count }) => ({ count })
		// get all of the point actions
		const mapDispatch = ({ count }) => ({ ...count })

		const mod = ({ store }) => {
			const { dispatch } = store
			dispatch.increment(2)
		}

		const module = connect({ mapState, mapDispatch })(mod)

		expect(module).toBeInstanceOf(Function)

		module({})

		expect(store.getState().count).toBe(2)
	})
})
