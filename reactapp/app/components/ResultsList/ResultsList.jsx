require('./ResultsList.css')
var ResultsItem = require('../ResultsItem')
var React = require('react')

var ResutlsList = React.createClass({

    resultItemSelected: function(url_audio_to_request, song_name){
        this.props.updatePlayer(url_audio_to_request, song_name)
    },
    render: function() {
        return(
             <section className={this.props.slide ? "mainbody slide" : "mainbody no-slide"}>
                   <i className={this.props.loading_playlist ? "loading-gif fa fa-circle-o-notch fa-4x fa-spin" : null  }></i>
                   <div className="results">
                    {this.props.resultsList.map(function(resultItem){
                        return (
                            
                            <ResultsItem key={resultItem.id} resultsItem={resultItem} resultItemSelected={this.resultItemSelected} />
                        )
                    }.bind(this))}
                    </div>
             </section>

         )
    }
});

module.exports = ResutlsList