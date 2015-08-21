require('./Player.css')


var React = require('react')

var Player = React.createClass({
    reloadAudioTag: function() {
        React.findDOMNode(this.refs.audio_tag).load()
    },
    render: function(){

         return(

                <nav className={this.props.slide  ? "fixed-nav-bar-bottom slide":"fixed-nav-bar-bottom no-slide"}>
                  <audio controls ref="audio_tag">
                    <source src={this.props.item_to_play} type="audio/mpeg"/>
                    Your browser does not support the audio element.
                    TODO this.state.audio_url no funciona. Implement in a different way
                    https://github.com/humanhighway/react-audio-player/tree/master/js
                </audio>
                </nav>

        )
       
    }
});

module.exports=Player