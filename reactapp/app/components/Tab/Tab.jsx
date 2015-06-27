
var React = require('react')
var Tab = React.createClass({
    handleClick: function(e){
        e.preventDefault();
        this.props.handleClick();
    },
    
    render: function(){

        return (
            <li className={this.props.isCurrent ? 'mui-active' : null}>
                <a  data-mui-toggle="tab" onClick={this.handleClick} >
                    {this.props.name}
                </a>
            </li>
        );
    }
});

module.exports = Tab