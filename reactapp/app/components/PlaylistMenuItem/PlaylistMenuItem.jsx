var React = require('react')

var PlaylistMenuItem = React.createClass({
    handleClick: function(playlist) {
        this.props.selectPlaylist(playlist)
    },

    render: function() {
        return(
            <li>
                <a className="menu-item" onClick={this.handleClick.bind(this, this.props.playlist)}>{this.props.playlist.name}</a>
            </li>
         )
    }
});

module.exports = PlaylistMenuItem