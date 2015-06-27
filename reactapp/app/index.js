require('normalize.css')
require('./css/styles.css')

const debug = require('debug')
const React = require('react')
const App = require('./components/MainApp')
const log = debug('application:bootstrap')

// Enable debug messages outside of production
if (process.env.NODE_ENV !== 'production') {
  debug.enable('application:*')
}

log('creating application node')
const applicationNode = document.createElement('div')
applicationNode.className = 'application'
applicationNode.id = 'application'

log('adding application node to body')
document.body.appendChild(applicationNode)

log('mounting application')
React.render(<App/>, applicationNode, () => {
  log('finished mounting application')
})

