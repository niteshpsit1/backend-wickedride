var UserName = React.createClass({
	/*getInitialState: function(){
		return ({
			
			member:{}
			
		});
	},
	componentWillMount: function(){
        
	},*/
	render: function () {
		
		return (
			<span>{this.props.adminName || this.props.userCredentials.username}</span>
		);
	},
	
});