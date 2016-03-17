require('./Player.css')
var AudioPlayer = require('../AudioPlayer')

var React = require('react')

var Player = React.createClass({

    render: function(){
         return(

                <nav className={this.props.slide  ? "fixed-nav-bar-bottom slide":"fixed-nav-bar-bottom no-slide"}>
                  <AudioPlayer src={this.props.item_to_play.url} song_playing={this.props.item_to_play.song_name} play_next={this.props.play_next}/>
                </nav>

        )
       
    }
});

module.exports=Player