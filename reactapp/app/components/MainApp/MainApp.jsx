require('./MainApp.css')
require('./assets/base.css')
var Player = require('../Player')
var Header = require('../Header')
var SearchBar = require('../SearchBar')
var PlaylistMenu = require('../PlaylistMenu')
var React = require('react')


var App = React.createClass({
    selectPlaylist: function(playlist){
        console.log(playlist)
        // fetch('/get_playlist_data/'+JSON.stringify(playlist))
        //   .then(function(response) {
        //     return response.text()
        //   }).then(function(body) {
        //     var playlist_data = JSON.parse(body).results
        //     console.log(playlist_data)
        //     this.setState({resultsList: playlist_data, filteredList: playlist_data})
        //   }.bind(this));

    },
   getInitialState: function () {        
        return {
            currentTab: 1,
            slide: false
        };
    },
    tabChange: function(currentTab){
        if (currentTab==2){
            this.setState({slide:true})   
            document.addEventListener("click", this.hidePlaylistMenu)
        }
        this.setState({currentTab:currentTab})
    },
    hidePlaylistMenu: function(){
        document.removeEventListener("click", this.hidePlaylistMenu)
        this.setState({slide:false})
    },
    render: function(){
        return(
            <div> 
                <div className="sidebar">
                    <PlaylistMenu selectPlaylist={this.selectPlaylist}/>
                </div>
                <div className={this.state.slide ? "main-wrapper slide" : "main-wrapper no-slide"}>
                
                    <Header currentTab={this.state.currentTab} tabChange={this.tabChange} />
                    <SearchBar />
                    
                    <Player />
                </div>
            </div>
        );
    }
});



React.render(
    <App />,
    document.body
);
