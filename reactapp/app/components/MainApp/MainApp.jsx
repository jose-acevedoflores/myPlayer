require('./MainApp.css')
require('./assets/base.css')
var Player = require('../Player')
var Header = require('../Header')
var SearchBar = require('../SearchBar')
var React = require('react')

var App = React.createClass({

    render: function(){
        return(
            <div className="main-wrapper">
                
                <Header/>
                <SearchBar />
                

                <Player />
            </div>
        );
    }
});



React.render(
    <App />,
    document.body
);
