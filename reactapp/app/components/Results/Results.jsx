require('./Results.css')
var React = require('react')
var Player = require('../Player')
var ResultItem = require('../ResultItem')

var Results = React.createClass({
    componentDidUpdate: function (){


    },
    getInitialState:function(){
        return {
            audio_url:null
        }
    },
    resultItemSelected:function(url_audio_to_request){
        fetch('/audio_stream/'+url_audio_to_request)
          .then(function(response) {
            return response.text()
          }).then(function(body) {
            console.log(body)
            this.setState({audio_url: "static/audio/"+ body+ ".mp3"})
          }.bind(this));
    },
    render: function(){
         
        return(
            <div>
                <Player audio_url={this.state.audio_url} />
                <div className="resultsList">
                    {this.props.resultsList.map(function(resultItem){
                        return (
                            
                            <ResultItem key={resultItem.id} resultItem={resultItem} resultItemSelected={this.resultItemSelected}/>
                        )
                    }.bind(this))} 
                  
                </div>
            </div>
        )
    }
});

module.exports = Results