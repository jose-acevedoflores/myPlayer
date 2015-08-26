require('./ResultsItem.css')
var React = require('react')

var ResultsItem = React.createClass({
    handleClick: function(url_audio_to_request, song_name){
        this.props.resultItemSelected(url_audio_to_request, song_name)
    },
    render: function() {
        return(
           <div className="mui-panel my-panel" onClick={this.handleClick.bind(this, this.props.resultsItem.url, this.props.resultsItem.name)}>
                <span><img src={this.props.resultsItem.thumbnail_url }/> </span>
                <span className="mui-divider-left"> {   this.props.resultsItem.name}</span>    
            </div>
         )
    }
});

module.exports = ResultsItem