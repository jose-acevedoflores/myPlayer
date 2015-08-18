require('./MainApp.css')
require('./assets/base.css')
var Player = require('../Player')
var Header = require('../Header')
var SearchBar = require('../SearchBar')
var React = require('react')

var App = React.createClass({
   getInitialState: function () {        
        return {
            currentTab: 1
        };
    },
    tabChange: function(currentTab){
        this.setState({currentTab:currentTab})
    },
    render: function(){
        return(
            <div className="main-wrapper">
                
                <Header currentTab={this.state.currentTab} tabChange={this.tabChange}/>
                <SearchBar/>
                

                <Player/>
            </div>
        );
    }
});



React.render(
    <App />,
    document.body
);
