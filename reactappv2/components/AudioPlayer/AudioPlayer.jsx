'use strict';
require('./AudioPlayer.css')
var React = require('react');


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
      lt:7.6,
      rt:0,
      playing: false,
      canPlay: false
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
    try {
      var audioElements = document.getElementsByTagName('audio');
      for(var i = 0; i < audioElements.length; i++) {
        audioElements[i].pause();
      }
    } catch(e) {}
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
      lt:7.6,
      rt:0,
      playing: false,
      canPlay: false
    });
  },

  audioUpdate: function() {
    var playerElement = this.refs.player;
    var rt = playerElement.currentTime / playerElement.duration;
    var tapeLeft = 7.6 * (1 - rt);
    var tapeRight = 7.6 - tapeLeft;
    if(tapeLeft < 0.07) {
      tapeLeft = 0.07;
    }
    this.setState({
      lt:tapeLeft,
      rt:tapeRight
    });
  },

  audioEnded: function() {
    console.log('vjashijcknvjbkdashjcvnkbjkfeahdjcnvk')
    this.setState({
      playing: false
    });
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
        <h4 className="selected-track"> {this.props.song_playing}</h4>
      </div>
    );
  }
});


module.exports = AudioPlayer;