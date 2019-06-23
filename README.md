## Rematch integration

You’ll need to know how to use rematch to use this feature. Spon.js exposes a hook for subscribing to store updates. It uses the connect function to bind the store state and reducers to the module

/store/index.js

```javascript
import { init } from '@rematch/core'
import createRematchPersist from '@rematch/persist'
import { default as connectStore } from '@spon/connect'
import * as models from './models/index'

const persistPlugin = createRematchPersist({
	whitelist: ['cart'],
	throttle: 1000,
	version: 1
})

const store = init({
	models: {
		...models
	},
	plugins: [persistPlugin]
})

// this creates a function that is used to bind modules to the store
export const connect = connectStore(store)

export default store
```

/behaviours/example

```javascript
import { connect } from './store'
import { domEvents, withPlugins } from '@spon/plugins'

// removed other code for brevity
function example({ node, addEvents, store, render }) {
	// this function will be called every time
	// the objects returned from the mapState
	// function change

	store.deleteItemFromCart(node.id)

	render(({ prevState, currentState }) => {
		// code written here should only
		// react to changes
		// you shouldn't be quering the dom
		// or making ajax requests
		// this is reactive code only!
	})
}

// get the cart state
const mapState = store => {
	return {
		cart: store.cart
	}
}
// get all of the cart actions
// note: I could have written the function above like this
const mapDispatch = ({ cart }) => ({ ...cart })

export default withPlugins(domEvents)(
	connect({
		mapState,
		mapDispatch
	})(basket)
)
```
