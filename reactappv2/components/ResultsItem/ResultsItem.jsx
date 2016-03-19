require('./ResultsItem.css')
var React = require('react')

var ResultsItem = React.createClass({
    getInitialState:function(){
        return {
            loading_song:false
        };
    },
    componentWillReceiveProps: function(nextProps) {
        if(nextProps.currentPlaying == this.props.resultsItem.url){
            this.setState({loading_song:false})
        }
    },
    handleClick: function(url_audio_to_request, song_name, result_list_index){
        this.setState({loading_song:true})
        this.props.resultItemSelected(url_audio_to_request, song_name, result_list_index )
    },
    render: function() {
        return(
           <div className={this.props.currentPlaying == this.props.resultsItem.url ? " list-item currentPlaying" : " list-item "} onClick={this.handleClick.bind(this, this.props.resultsItem.url, this.props.resultsItem.name, this.props.result_list_index)}>
                <i className={this.state.loading_song ? "loading" : null  }></i>
                <img className="resultImage" src={this.props.resultsItem.thumbnail_url }/> 
                <div className="resultInfo">
                    <div className="resultTitle">
                    { this.props.resultsItem.name}
                    </div>
                </div>
            </div>
         )
    }
});

module.exports = ResultsItem