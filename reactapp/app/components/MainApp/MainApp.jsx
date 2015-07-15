require('./MainApp.css')
require('./assets/base.css')

var React = require('react')

var App = React.createClass({

    render: function(){
        return(
            <div className="main-wrapper">
                <nav className="fixed-nav-bar">
  <div id="menu" className="menu">
    <a className="sitename" href="fixed-navigation-bar.html">Fixed Nav Bar</a>

    <ul className="menu-items">
      <li><a href="//sixrevisions.com">Home</a></li>
      <li><a href="//sixrevisions.com/about/">About</a></li>
      <li><a href="//sixrevisions.com/contact/">Contact</a></li>
      <li><a href="//twitter.com/sixrevisions">Twitter</a></li>
      <li><a href="//www.facebook.com/sixrevisions">Facebook</a></li>
  </ul>
  </div>
</nav>

<nav className="fixed-nav-bar-bottom">
  <div id="menu" className="menu">
    <a className="sitename" href="fixed-navigation-bar.html">Fixed Nav Bar</a>

    <ul className="menu-items">
      <li><a href="//sixrevisions.com">Homeb</a></li>
      <li><a href="//sixrevisions.com/about/">Aboutb</a></li>
      <li><a href="//sixrevisions.com/contact/">Contactb</a></li>
      <li><a href="//twitter.com/sixrevisions">Twitterb</a></li>
      <li><a href="//www.facebook.com/sixrevisions">Facebookb</a></li>
  </ul>
  </div>
</nav>

<section className="content">
  <div className="description">
    <h1>Fixed Navigation Bar</h1>
    <p className="summary">A fixed-position (or "sticky") top navigation bar. Scroll this page to see the top navigation bar stay in place.</p>
    <a className="button" href="//sixrevisions.com/css/fixed-navigation-bar/">Read the tutorial</a>
    <a className="button" href="//github.com/sixrevisions/fixed-navigation-bar">View Source on GitHub</a>
  </div>
</section>
<section className="some-related-articles">
  <h1>Articles About Website Navigation</h1>
  <p>Here are links (with excerpts) to five Six Revisions articles that talk about website navigation. (Because filler content/lorem ipsum sucks.)</p>
  <h2><a href="//sixrevisions.com/user-interface/navigation-design-patterns/">Guide to Website Navigation Design Patterns</a></h2>
  <p>Site navigation has a wide variety of common and familiar design patterns that can be used as a foundation for building effective information architecture for a website. This guide covers popular site navigation design patterns. For each site navigation design pattern, we discuss its common characteristics, its drawbacks, and when best to use it.</p>
  <h2><a href="//sixrevisions.com/user-interface/is-it-time-to-rethink-website-navigation/">Is It Time To Rethink Website Navigation?</a></h2>
  <p>One of the many beautiful things about web design is the near-limitless options available to us. Yet, still, our navigation systems seem stuck into the existing preformed solutions. For small, personal sites, a simple top horizontal navigation bar is the typical option.</p>
  <h2><a href="//sixrevisions.com/web-standards/trying-navigate-website-navigation/">Trying to Navigate Website Navigation</a></h2>
  <p>Having clearly labeled navigation types to choose from can help people organize the information more easily. For us professionals, having standardized nomenclature allow us to discuss and explore the subject.  Even information architecture (IA) experts like Lou Rosenfeld, Steve Krug, Jesse James Garrett, and Jakob Nielsen dont agree as to what "secondary navigation" is.</p>
  <h2><a href="//sixrevisions.com/user-interface/responsive-menus/">8 Ways to Add a Responsive Navigation Menu on Your Site</a></h2>
  <p>There are plenty of techniques for implementing responsive navigation menus on your site. This article talks about eight excellent open source projects for building responsive navigation menus. At the end of the article, you will find a summary table that has links to the official site, demos, usage guide, and official open source repository for each project.</p>
  <h2><a href="http://sixrevisions.com/usabilityaccessibility/information-architecture-101-techniques-and-best-practices/">Information Architecture 101: Techniques and Best Practices</a></h2>
  <p>Without a clear understanding of how information architecture (IA) works, we can end up creating sites that are more confusing than they need to be or, worse, make our content virtually inaccessible. This guide covers the fundamentals of information architecture for organizing website content. We will look into popular IA design patterns, best practices, design techniques, and case examples.</p>
  <p><a className="button-dark" href="//sixrevisions.com/css/fixed-navigation-bar/">Read the tutorial</a>
  <a className="button-dark" href="//github.com/sixrevisions/fixed-navigation-bar">View Source on GitHub</a></p>
</section>
            </div>
        );
    }
});



React.render(
    <App />,
    document.body
);
