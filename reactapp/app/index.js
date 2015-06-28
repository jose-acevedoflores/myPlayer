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


log('mounting application')
React.render(<App/>, () => {
  log('finished mounting application')
})

