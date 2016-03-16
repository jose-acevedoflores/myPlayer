require('./ResultsList.css')
var ResultsItem = require('../ResultsItem')
var React = require('react')

var ResutlsList = React.createClass({

    getInitialState: function () {        
        return {
            currentPlaying:0
        };
    },
    resultItemSelected: function(url_audio_to_request, song_name){
        console.log('list')
        console.log(url_audio_to_request)
        this.props.updatePlayer(url_audio_to_request, song_name)
        this.setState({currentPlaying:url_audio_to_request})
        
    },
    render: function() {
        return(
             <section className={this.props.slide ? "mainbody slide" : "mainbody no-slide"}>
                   <i className={this.props.loading_playlist ? "loading-gif fa fa-circle-o-notch fa-4x fa-spin" : null  }></i>
                   <div className="results">
                    {this.props.resultsList.map(function(resultItem){
                        return (

                            <ResultsItem currentPlaying={this.state.currentPlaying} key={resultItem.id} resultsItem={resultItem} resultItemSelected={this.resultItemSelected} />
                        )
                    }.bind(this))}
                    </div>
             </section>

         )
    }
});

module.exports = ResutlsList