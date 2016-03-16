
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
    handleSearch: function(event){
        console.log('jbadfns fdnkl')
           if (this.props.currentTab == 1 && event.key == 'Enter' ){
            this.props.searchResultsList(event.target.value, "enter_event")
        }
    },
    render: function(){
        return(

            <div className= {this.props.slide  ? "search-field-div slide" : "search-field-div no-slide" }>
                <div className="size-search-field">
                    <input type="text" className="mui-form-control" placeholder="Search" onChange={this.handleChange} onKeyPress={this.handleSearch}/>
                </div>
            </div>

        );
    }
});

module.exports=SearchBar