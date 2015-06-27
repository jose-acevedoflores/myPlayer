require('./MainApp.css')
var tabList = [
    { 'id': 1, 'name': 'Search' },
    { 'id': 2, 'name': 'Playlists'}
];

var React = require('react')
var Results = require('../Results')
var SearchTabContent = require('../SearchTabContent')
var Tabs = require('../Tabs')
var PlaylistMenu = require('../PlaylistMenu')


var App = React.createClass({
    showRight: function() {
        this.setState({slide:true})
    },
    hideRight:function(){
        if(this.state.slide){
            this.setState({slide:false, currentTab:1})
        }
    },
    getInitialState: function () {        
        return {
            tabList: tabList,
            currentTab: 1,
            resultsList: [],
            filteredList: [],
            slide: false
        };
    },
    selectPlaylist: function(playlist){
        fetch('/get_playlist_data/'+JSON.stringify(playlist))
          .then(function(response) {
            return response.text()
          }).then(function(body) {
            var playlist_data = JSON.parse(body).results
            console.log(playlist_data)
            this.setState({resultsList: playlist_data, filteredList: playlist_data})
          }.bind(this));

    },
    handleSearch: function(searchString, event_identifier){

        if(event_identifier == "key_event"){
            var filteredList = this.state.resultsList
            if(searchString.length > 0){
                 filteredList = this.state.resultsList.filter(function(item){
                    return item.name.toLowerCase().match( searchString );
                  });
            }
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
    changeTab: function(tab) {
        this.setState({ currentTab: tab.id});
    },

    render: function(){
        return(
            <div className="main-wrapper" onClick={this.hideRight}>
                <div className="sidebar">
                    <PlaylistMenu ref="right" hideRight={this.hideRight} selectPlaylist={this.selectPlaylist} />
                </div>

                <div className={this.state.slide ? "content-wrapper slide-left" : "content-wrapper" }>
                    <Tabs
                        currentTab={this.state.currentTab}
                        tabList={this.state.tabList}
                        changeTab={this.changeTab} 
                        showRight={this.showRight}/>
                    <SearchTabContent currentTab={this.state.currentTab} handleSearch={this.handleSearch}/>
                    <Results resultsList={this.state.filteredList}/>
                </div>
            </div>
        );
    }
});



React.render(
    <App />,
    document.body
);