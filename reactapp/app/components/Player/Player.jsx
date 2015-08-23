require('./Player.css')
var AudioPlayer = require('../AudioPlayer')

var React = require('react')

var Player = React.createClass({

    render: function(){
         return(

                <nav className={this.props.slide  ? "fixed-nav-bar-bottom slide":"fixed-nav-bar-bottom no-slide"}>
                  <AudioPlayer src={this.props.item_to_play}/>
                </nav>

        )
       
    }
});

module.exports=Player