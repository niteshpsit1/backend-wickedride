var ClubMembers = React.createClass({

	render: function () {
		return (
			<div>
				<div className="row">
					<div className="well col-md-2">{this.props.member.userName}</div>
					<div className="well col-md-2">{this.props.member.designation}</div>
					<div className="well col-md-2">{this.props.member.awards}</div>
					<div className="well col-md-2">{Object.keys(this.props.member.clubJoined).length}</div>
				</div>
			</div>
		);
	}
});