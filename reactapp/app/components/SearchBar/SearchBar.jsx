
require('./SearchBar.css')


var React = require('react')

var SearchBar = React.createClass({
   getInitialState: function () {        
        return {
            currentTab: 1
        };
    },
    handleSearch: function(){
        this.setState({currentTab:1})
    },
    render: function(){
        return(

            <div className= {this.props.slide  ? "search-field-div slide" : "search-field-div no-slide" }>
                <div className="size-search-field">
                    <input type="text" className="mui-form-control" placeholder="Search"/>
                </div>
            </div>

        );
    }
});

module.exports=SearchBar