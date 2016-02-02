var UserList =	React.createClass({
	render: function() {
		return (
			<tr>
				<td><p>{this.props.user.userName}</p></td>
				<td><p>{this.props.user.email}</p></td>
				<td><p>{this.props.user.number}</p></td>
				<td><p className="ride"></p><p>{this.props.user.noOfClubJoined}</p></td>
				<td><a href="#" className="remove"></a> <a href="#" className="trophies"></a></td>
			</tr>
		)
	}
});