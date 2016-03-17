require('./ResultsItem.css')
var React = require('react')

var ResultsItem = React.createClass({
    handleClick: function(url_audio_to_request, song_name, result_list_index){
        console.log('item')
        console.log(url_audio_to_request)
        this.props.resultItemSelected(url_audio_to_request, song_name, result_list_index )
    },
    render: function() {
        return(
           <div className={this.props.currentPlaying == this.props.resultsItem.url ? "mui-panel my-panel currentPlaying" : "mui-panel my-panel "} onClick={this.handleClick.bind(this, this.props.resultsItem.url, this.props.resultsItem.name, this.props.result_list_index)}>
                <span><img src={this.props.resultsItem.thumbnail_url }/> </span>
                <span className="mui-divider-left"> { this.props.resultsItem.name}</span>    
            </div>
         )
    }
});

module.exports = ResultsItem