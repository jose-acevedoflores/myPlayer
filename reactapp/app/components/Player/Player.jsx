require('./Player.css')


var React = require('react')

var Player = React.createClass({

    render: function(){
        return(

                <nav className="fixed-nav-bar-bottom">
                  <div id="menu" className="menu">
                    <a className="sitename" href="fixed-navigation-bar.html">Fixed Nav Bar</a>

                    <ul className="menu-items">
                      <li><a href="//sixrevisions.com">Homeb</a></li>
                      <li><a href="//sixrevisions.com/about/">Aboutb</a></li>
                      <li><a href="//sixrevisions.com/contact/">Contactb</a></li>
                      <li><a href="//twitter.com/sixrevisions">Twitterabsvdhksb</a></li>
                      <li><a href="//www.facebook.com/sixrevisions">Facebookb</a></li>
                  </ul>
                  </div>
                </nav>

        );
    }
});

module.exports=Player