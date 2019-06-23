## Available Plugins

### Device (window resize)

```javascript
import { withPlugins } from '@spon/core'
import { device } from '@spon/plugins'

/**
 * @function example
 * @param {Object} props
 * @property {HTMLElement} props.node
 * @property {Object} props.plugins
 * @property {Object} props.plugins.device
 * @return {Function} a function to unmount
 */
function example({ node, plugins: { device } }) {
	device.width // the current viewport width
	device.height // the current viewport height

	device.resize(() => {
		// called when the window resizes
	})

	device.at('(min-width="1024px")', {
		on: () => {
			// called when the media query matches the current viewport
		},

		off: () => {
			// called when the media query does not match the current viewport
		}
	})

	device.cancel() // stop listening to resize events
}

export default withPlugins(device)(example)
```

### Inview (IntersectionObserver)

```javascript
import { withPlugins } from '@spon/core'
import { inview } from '@spon/plugins'

/**
 * @function example
 * @param {Object} props
 * @property {HTMLElement} props.node
 * @property {Object} props.plugins
 * @property {Object} props.plugins.inview
 * @return {Function} a function to unmount
 */
function example({ node, plugins: { inview } }) {
	// watch the node
	inview.observe({
		enter: (entry, observer) => {
			// called when the node enters the viewport
		},
		exit: (entry, observer) => {
			// called when the node exits the viewport
		}
	})

	// watch some other nodes
	inview.observe(document.querySelectorAll('[data-inview]'), {
		enter: (entry, observer) => {
			// called when the node enters the viewport
		},
		exit: (entry, observer) => {
			// called when the node exits the viewport
		}
	})

	inview.disconnect() // remove any intersection observers
}

export default withPlugins(inview)(example)
```

### Mutation (MutationObserver)

```javascript
import { withPlugins } from '@spon/core'
import { mutation } from '@spon/plugins'

/**
 * @function example
 * @param {Object} props
 * @property {HTMLElement} props.node
 * @property {Object} props.plugins
 * @property {Function} props.plugins.mutation
 * @return {Function} a function to unmount
 */
function example({ node, plugins: { mutation } }) {
	// watch the node
	const { observe, disconnect } = mutation(node, {
		attributes: true,
		childList: false,
		subtree: false
	})

	observe(() => {
		// called when a mutation happens on the node
	})

	disconnect() // remove any mutation observers
}

export default withPlugins(mutation)(example)
```

### Resize (resize observer)

```javascript
import { withPlugins } from '@spon/core'
import { resize } from '@spon/plugins'

/**
 * @function example
 * @param {Object} props
 * @property {HTMLElement} props.node
 * @property {Object} props.plugins
 * @property {Function} props.plugins.resize
 * @return {Function} a function to unmount
 */
function example({ node, plugins: { resize } }) {
	// watch the node
	const { observe, disconnect } = resize(node)

	observe(() => {
		// called when a the element changes size
	})

	disconnect() // remove any  resize observers
}

export default withPlugins(resize)(example)
```

### Scroll (window scroll)

```javascript
import { withPlugins } from '@spon/core'
import { scroll } from '@spon/plugins'
/**
 * @function example
 * @param {Object} props
 * @property {HTMLElement} props.node
 * @property {Object} props.plugins
 * @property {Object} props.plugins.scroll
 * @return {Function} a function to unmount
 */
function example({ node, plugins: { scroll } }) {
	// watch the node
	scroll.progress(() => {
		// called as the user scrolls
	})

	scroll.start(() => {
		// called when the user starts scrolling
	})

	scroll.stop(() => {
		// called when the user stops scrolling
	})

	scroll.destroy() // remove the scroll event
}

export default withPlugins(resize)(example)
```

### Dom Events (event delegation)

```javascript
import { withPlugins } from '@spon/core'
import { domEvents } from '@spon/plugins'

/**
 * @function example
 * @param {Object} props
 * @property {HTMLElement} props.node
 * @property {Object} props.plugins
 * @property {Function} props.plugins.addEvents
 * @return {Function} a function to unmount
 */
function example({ node, plugins: { addEvents, removeEvents, removeEvent } }) {
	// watch the node

	// add events, delegated to the node
	addEvents({
		'click [data-toggle-button]': (e, elm) => {
			e.preventDefault()
			elm.classList.toggle('is-active')
		},
		'mouseenter [data-toggle-button]': [
			(e, elm) => {
				e.preventDefault()
				elm.classList.toggle('is-active')
			},
			true // capture value
		]
	})

	// delegate events to the body
	addEvents(document.body, {
		'click [data-toggle-button]': (e, elm) => {
			e.preventDefault()
			elm.classList.toggle('is-active')
		}
	})

	removeEvents() // remove all events

	removeEvent('click [data-toggle-button]') // remove event by 'event selector'
}

export default withPlugins(domEvents)(example)
```

### All together

```javascript
import { withPlugins } from '@spon/core'
import {
	domEvents,
	scroll,
	inview,
	mutation,
	device,
	resize
} from '@spon/plugins'

/**
 * @function example
 * @param {Object} props
 * @property {HTMLElement} props.node
 * @property {Object} props.plugins
 * @property {Function} props.plugins.addEvents
 * @return {Function} a function to unmount
 */
function example({
	node,
	plugins: { addEvents, inview, mutation, device, resize, scroll }
}) {
	// do stuff
}

export default withPlugins(domEvents, inview, mutation, device, resize, scroll)(
	example
)
```
