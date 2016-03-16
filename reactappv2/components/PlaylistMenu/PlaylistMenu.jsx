
require('./PlaylistMenu.css')


var React = require('react')
var PlaylistMenuItem = require('../PlaylistMenuItem')
var PlaylistMenu = React.createClass({

    handleClick: function(playlist){
        console.log('handle')
        this.props.selectPlaylist(playlist)
          this.setState({
                playlist_selected: true 
          });
    },
    componentDidMount: function() {

        fetch('/get_playlists')
          .then(function(response) {
            return response.text()
          }).then(function(body) {
            var playlists = JSON.parse(body).results
                this.setState({
                  playlists: playlists,
                  loading_playlists: false
                });
          }.bind(this));
    },
   getInitialState: function () {        
        return {
            loading_playlists: true,
            playlists : [],
            playlist_selected: false
        };
    },
    render: function(){
        return (
                <div className='playlist-menu'>
                    <div className="title">
                        Playlists
                    </div>
                    <div className='playlist-items'> 
                        <i className={this.state.loading_playlists ? "fa fa-spinner fa-4x fa-spin " : null  }></i>
                        <ul>
                        {this.state.playlists.map(function(playlist){
                            return(
                                    <PlaylistMenuItem key={playlist.id} playlist={playlist} selectPlaylist={this.props.selectPlaylist}/>
                                    
                                )
                            }.bind(this))     
                            }
                        </ul>
                    </div>
                </div>
        )
    }
});

module.exports=PlaylistMenu