
var React = require('react')
var Tab = require('../Tab')

var Tabs = React.createClass({

    showPlaylistMenu: function(){
        document.addEventListener("click", this.hidePlaylistMenu);
        this.props.showRight()
    },
    hidePlaylistMenu: function(){
        document.removeEventListener("click", this.hidePlaylistMenu);
        this.props.hideRight()
    },
    handleClick: function(tab){
        if(tab.id == 2)
            this.showPlaylistMenu()
        this.props.changeTab(tab);
    },
    
    render: function(){
        return (
            <nav>
                <ul className="mui-tabs mui-tabs-justified">
                {this.props.tabList.map(function(tab) {
                    return (
                        <Tab
                            handleClick={this.handleClick.bind(this, tab)}
                            key={tab.id}
                            name={tab.name}
                            isCurrent={(this.props.currentTab === tab.id)} />
                    );
                }.bind(this))}
                </ul>
            </nav>
        );
    }
});

module.exports = Tabs