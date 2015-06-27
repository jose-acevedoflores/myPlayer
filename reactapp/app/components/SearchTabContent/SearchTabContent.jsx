var React = require('react')
require('./SearchTabContent.css')
var SearchTabContent = React.createClass({

    getInitialState: function(){
        return { searchString: '' };
    },
    handleChange:function(event){
        this.setState({searchString:event.target.value});
        this.props.handleSearch(event.target.value, "key_event")
    },
    search: function(event){
        if (this.props.currentTab == 1 && event.key == 'Enter' ){
            this.props.handleSearch(event.target.value, "enter_event")
        }
    },
    render: function(){
            
            return ( 
                <div className="content">
                    <div className="search">
                        <input type="text" className="mui-form-control" value={this.state.searchString} onChange={this.handleChange} placeholder="Search!" onKeyPress={this.search}/>
                    </div>
                </div>
            )
        

    }
});

module.exports = SearchTabContent