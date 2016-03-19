require('./ResultsList.css')
var ResultsItem = require('../ResultsItem')
var React = require('react')

var ResutlsList = React.createClass({

    resultItemSelected: function(url_audio_to_request, song_name, result_list_index){
        this.props.updatePlayer(url_audio_to_request, song_name, result_list_index)
    },
    render: function() {

        if (this.props.loading_playlist == true){
            return <i className="overlay" ></i>;
        }
        else{
            return(
                 <section className={this.props.slide ? "mainbody slide" : "mainbody no-slide"}>
                       <div className="results" >
                        {this.props.resultsList.map(function(resultItem){
                            return (

                                <ResultsItem currentPlaying={this.props.currentPlaying} key={resultItem.id} resultsItem={resultItem} resultItemSelected={this.resultItemSelected} result_list_index={resultItem.id} />
                            )
                        }.bind(this))}
                        </div>
                 </section>

             )
        }
    }
});

module.exports = ResutlsList