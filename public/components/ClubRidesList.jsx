var ClubRidesList = React.createClass({

	render: function () {

		return (
			<div>Rides List
			<div className="row">
				<div className="well col-md-3">{this.props.ride.rideName}</div>
				<div className="well col-md-3">{this.props.ride.description}</div>
				<div className="well col-md-2">{this.props.ride.date}</div>
				<div className="well col-md-2">{this.props.ride.time}</div>
				<div className="well col-md-2">{Object.keys(this.props.ride.member).length}</div>
			</div>
			</div>
		);
	}
});