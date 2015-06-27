
var React = require('react')
var Tab = require('../Tab')

var Tabs = React.createClass({

    handleClick: function(tab){
        if(tab.id == 2)
            this.props.showRight()
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