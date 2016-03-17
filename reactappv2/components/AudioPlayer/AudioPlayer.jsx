'use strict';
require('./AudioPlayer.css')
var React = require('react');
import Slider from 'material-ui/lib/slider';

var AudioPlayer = React.createClass({

  propTypes: {
    preload: React.PropTypes.string,
    mimeType: React.PropTypes.string,
    labelColor: React.PropTypes.string,
    tapeColor: React.PropTypes.string,
    cassetteColor: React.PropTypes.string,
    controlsColor: React.PropTypes.string,
    containerClass: React.PropTypes.string,
    scaleMethod: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      preload: 'metadata',
      mimeType: 'audio/mpeg',
      labelColor: '#fff',
      tapeColor: '#333',
      cassetteColor: '#333',
      controlsColor: '#999',
      containerClass: 'react-cassette-player',
      scaleMethod: 'meet'
    }
  },

  getInitialState: function() {
    return {
      playing: false,
      canPlay: false,
      slider_value: 0
    }
  },

  componentDidMount: function() {
    var playerElement = this.refs.player;
    if(this.props.preload === 'none') {
      this.audioReady();
    } else {
      playerElement.addEventListener('canplay', this.audioReady);
    }
    playerElement.addEventListener('ended', this.audioEnded);
    playerElement.addEventListener('timeupdate', this.audioUpdate);
    playerElement.addEventListener('pause', this.audioPause);
  },

  componentWillReceiveProps: function(nextProps) {
    if(this.props.src !== nextProps.src) {
      this.audioPause();
    }
  },

  componentDidUpdate: function(prevProps, prevState) {
    if(prevProps.src !== this.props.src) {
      this.audioLoad();
      this.audioPlay();
    }
  },

  audioReady: function() {
    this.setState({
      canPlay: true
    });
  },

  audioPlay: function() {
    this.refs.player.play();
    this.setState({
      playing: true
    });
  },

  audioPause: function() {
    this.refs.player.pause();
    this.setState({
      playing: false
    });
  },

  audioLoad: function() {
    this.refs.player.load();
    this.setState({
      playing: false,
      canPlay: false
    });
  },

  audioUpdate: function() {
    var playerElement = this.refs.player;
    var rt = playerElement.currentTime / playerElement.duration;
    this.setState({
      slider_value: rt
    });
  },
  slider_changed: function(e, value){
    this.setState({
      slider_value: value
    });
    var playerElement = this.refs.player;
    playerElement.currentTime = value*playerElement.duration
  },

  audioEnded: function() {
    this.setState({
      playing: false
    });
    this.props.play_next()
  },

  togglePlayPause: function() {
    if(this.state.canPlay) {
      if(this.state.playing) {
        this.audioPause();
      } else {
        this.audioPlay();
      }
    }
  },

  render: function() {
   
    return (
      <div className={this.props.containerClass}>
        <audio ref="player" preload={this.props.preload}>
          <source src={this.props.src} type={this.props.mimeType} />
        </audio>
          
        <i onClick={this.togglePlayPause} className={this.state.playing ? "control fa fa-pause fa-2x" :  "control fa fa-play fa-2x"}></i>
        <div className="player-data-horizontal">
          <h6 className="selected-track-name"> {this.props.song_playing}</h6>
          <Slider value={this.state.slider_value} onChange={this.slider_changed}/>
        </div>
      </div>
    );
  }
});


module.exports = AudioPlayer;