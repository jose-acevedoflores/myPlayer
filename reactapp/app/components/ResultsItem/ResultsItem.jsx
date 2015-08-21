require('./ResultsItem.css')
var React = require('react')

var ResultsItem = React.createClass({
    handleClick: function(url_audio_to_request){
        this.props.resultItemSelected(url_audio_to_request)
    },
    render: function() {
        return(
           <div className="mui-panel my-panel" onClick={this.handleClick.bind(this, this.props.resultsItem.url)}>
                <span><img src={this.props.resultsItem.thumbnail_url }/> </span>
                <span className="mui-divider-left"> {   this.props.resultsItem.name}</span>    
            </div>
         )
    }
});

module.exports = ResultsItem