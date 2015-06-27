var React = require('react')
require('./ResultItem.css')
var ResultItem = React.createClass({
  handleClick : function(url_audio_to_request){
    this.props.resultItemSelected(url_audio_to_request)
  } ,
  render: function() {
    return (

            <div className="mui-panel my-panel" onClick={this.handleClick.bind(this, this.props.resultItem.url)}>
                <span><img src={this.props.resultItem.thumbnail_url }/> </span>
                <span className="mui-divider-left"> {   this.props.resultItem.name}</span>    
            </div>


                        )
  }
});

module.exports = ResultItem