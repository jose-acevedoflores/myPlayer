require('./Header.css')


var React = require('react')

var Header = React.createClass({

    render: function(){
        return(

               <nav className="fixed-nav-bar">
                  <div id="menu" className="menu">
                    <a className="sitename" href="fixed-navigation-bar.html">Fixed Nav Bar HE</a>

                    <ul className="menu-items">
                      <li><a href="//sixrevisions.com">Home</a></li>
                      <li><a href="//sixrevisions.com/about/">About</a></li>
                      <li><a href="//sixrevisions.com/contact/">Contact</a></li>
                      <li><a href="//twitter.com/sixrevisions">Twitter</a></li>
                      <li><a href="//www.facebook.com/sixrevisions">Facebook</a></li>
                  </ul>
                  </div>
                </nav>

        );
    }
});

module.exports=Header