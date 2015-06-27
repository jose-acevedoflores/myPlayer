var React = require('react')
require('./Player.css')
// <span> <i className="fa fa-play fa-3x"></i> </span>
var Player = React.createClass({
    
    render: function() {
        return (
            <div className="footer"> 
            
             <audio controls>
                    <source src={this.props.audio_url} type="audio/mpeg"/>
                    Your browser does not support the audio element.
                    TODO this.state.audio_url no funciona. Implement in a different way
                    https://github.com/humanhighway/react-audio-player/tree/master/js
            </audio>
            </div>
            )
    }
});

module.exports = Player