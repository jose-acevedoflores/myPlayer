
require('./SearchBar.css')


var React = require('react')

var SearchBar = React.createClass({
   getInitialState: function () {        
        return {
            searchString: '' 
        };
    },
    handleChange:function(event){
        this.setState({searchString:event.target.value});
        this.props.searchResultsList(event.target.value, "key_event")
    },
    handleSearch: function(){
        this.setState({currentTab:1})
    },
    render: function(){
        return(

            <div className= {this.props.slide  ? "search-field-div slide" : "search-field-div no-slide" }>
                <div className="size-search-field">
                    <input type="text" className="mui-form-control" placeholder="Search" onChange={this.handleChange}/>
                </div>
            </div>

        );
    }
});

module.exports=SearchBar