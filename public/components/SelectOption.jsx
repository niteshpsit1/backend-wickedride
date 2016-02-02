var SelectOption = React.createClass({
	render: function(){
		return (
			<option value={this.props.name || this.props._id}>{this.props.name}</option>
		);
	},
});