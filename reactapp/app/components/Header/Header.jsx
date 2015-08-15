require('./Header.css')


var React = require('react')

var Header = React.createClass({
   getInitialState: function () {        
        return {
            currentTab: 1
        };
    },
    handleSearch: function(){
        this.setState({currentTab:1})
    },
    handlePlaylist:function(){
        this.setState({currentTab:2})
    },
    render: function(){
        return(

              <nav className="fixed-nav-bar">
              <div className="tabs"> 
                <div className={this.state.currentTab == 1 ? "search selected" : "search"} onClick={this.handleSearch}>
                  <a> Search </a>
                </div>
                <div className={this.state.currentTab == 2 ?  "playlist selected" : "playlist"} onClick={this.handlePlaylist}>
                  <a> Playlists</a>
                </div>
              </div>
              </nav>

        );
    }
});

module.exports=Header