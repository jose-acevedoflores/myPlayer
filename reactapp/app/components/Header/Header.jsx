require('./Header.css')
var React = require('react')

var Header = React.createClass({

    handleSearch: function(){
        this.props.tabChange(1)
    },
    handlePlaylist:function(){
        this.props.tabChange(2)
    },
    render: function(){
        return(

              <nav className={this.props.slide ? "fixed-nav-bar slide" :"fixed-nav-bar no-slide"}>
                <div className="tabs"> 
                  <div className={this.props.currentTab == 1 ? "search selected" : "search"} onClick={this.handleSearch}>
                    <a> Search </a>
                  </div>
                  <div className={this.props.currentTab == 2 ?  "playlist selected" : "playlist"} onClick={this.handlePlaylist}>
                    <a> Playlists</a>
                  </div>
                </div>
              </nav>

        );
    }
});

module.exports=Header