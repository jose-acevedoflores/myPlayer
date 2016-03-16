require('./MainApp.css')
require('./assets/base.css')
var Player = require('../Player')
var Header = require('../Header')
var SearchBar = require('../SearchBar')
var PlaylistMenu = require('../PlaylistMenu')
var ResultsList = require('../ResultsList')
var React = require('react')
var ReactDOM = require('react-dom');



var App = React.createClass({
    selectPlaylist: function(playlist){
        // Show the loading gif
        this.setState({loading_playlist:true})
        fetch('/get_playlist_data/'+JSON.stringify(playlist))
          .then(function(response) {
            return response.text()
          }).then(function(body) {
            var playlist_data = JSON.parse(body).results
            console.log(playlist_data)
            // Get rid of the loading gif
            this.setState({loading_playlist:false})
            this.setState({resultsList: playlist_data, filteredList: playlist_data})
          }.bind(this));

    },
    getInitialState: function () {        
        return {
            currentTab: 1,
            slide: false,
            resultsList: [],
            filteredList: [],
            loading_playlist: false,
            item_to_play: {'url':null,  'song_name':''}
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
    filterList:function(searchString, event_identifier){
        if(event_identifier == "key_event"){
            // Initialize the list with all the results
            var filteredList = this.state.resultsList
            // Check if there is a string to search in the results list
            if(searchString.length > 0){
                 filteredList = this.state.resultsList.filter(function(item){
                    return item.name.toLowerCase().match( searchString );
                  });
            }
            // If there is no string in the search field then filtered list is equal to all the results
            this.setState({filteredList: filteredList})
        }
        else if(event_identifier == "enter_event"){
            fetch('/search/'+searchString)
              .then(function(response) {
                return response.text()
              }).then(function(body) {
                var playlist_data = JSON.parse(body).results
                this.setState({resultsList: playlist_data, filteredList: playlist_data})
            }.bind(this));
        }
    },
    updatePlayer:function(item_to_play, song_name){
         fetch('/audio_stream/'+item_to_play)
          .then(function(response) {
            return response.text()
          }).then(function(body) {
            var json_results = JSON.parse(body)
            this.setState({item_to_play:{
               "url": "http://"+json_results.hostIp+":"+json_results.audioStreamPort+"/audio/"+ json_results.results+ ".mp3",
                "song_name" : song_name
                }
            })
          }.bind(this));
    },
    render: function(){
        return(
            <div> 
                <div className="main-wrapper">
                    <PlaylistMenu selectPlaylist={this.selectPlaylist}/>
                    <Header currentTab={this.state.currentTab} tabChange={this.tabChange} slide={this.state.slide}/>
                    <SearchBar slide={this.state.slide} searchResultsList={this.filterList} currentTab={this.state.currentTab}/>

                    <ResultsList slide={this.state.slide} resultsList={this.state.filteredList} loading_playlist={this.state.loading_playlist} updatePlayer={this.updatePlayer}/>

                    <Player  item_to_play={this.state.item_to_play} slide={this.state.slide} />
                </div>
            </div>
        );
    }
});



ReactDOM.render(
    <App />,
    document.getElementById('body_node')
);
