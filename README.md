## Rematch/@spon/core integration

## Installation

`npm install @spon/core @spon/connect --save` or `yarn add @spon/core @spon/connect --save`

Peer Dependency

- @spon/core ^2.0.2

See [@spon/core](https://github.com/magicspon/spon-core/blob/master/README.md) for documentation

You’ll need to know how to use rematch to use this feature. Spon.js exposes a hook for subscribing to store updates. It uses the connect function to bind the store state and reducers to the module

/store/index.js

```javascript
import { init } from '@rematch/core'
import connectStore from '@spon/connect'

const store = init({
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

// this creates a function that is used to bind modules to the store
export const connect = connectStore(store)

export default store
```

/behaviours/example

```javascript
import { connect } from '@/store'
import { domEvents, withPlugins } from '@spon/plugins'

function counter({ plugins: { addEvents }, store, subscribe }) {
	const node = document.getElementById('value')

	addEvents({
		'click button': () => {
			store.dispatch.increment(1)
		}
	})

	subscribe(
		({ current }) => {
			node.textContent = current.count
		},
		['count'] // dependencies
	)
}

const mapState = store => {
	return {
		count: store.count
	}
}
const mapDispatch = ({ count }) => ({ ...count })

export default withPlugins(domEvents)(
	connect({ mapState, mapDispatch })(counter)
)
```
