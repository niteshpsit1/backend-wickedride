var Ride = React.createClass({
	getInitialState: function(){
		return ({
			ride: this.props.ride,
			showRideMembersModal: false,
			showRideDescriptionModal: false,
			description : null
			
		});
	},

	componentWillMount: function() {
        var des = null;
        des = this.state.ride.description.substring(0, 100);
        this.setState({description :des});
        console.log("desc",des.length);

	},

	handleShowRideMembersModal: function(){
        this.setState({showRideMembersModal: true});
        
    },
    handleShowRideDescriptionModal: function(){
        this.setState({showRideDescriptionModal: true});
        
    },
    
    handleHideRideMembersModal: function(){
    	
        this.setState({showRideMembersModal: false});
    },
    handleHideRideDescriptionModal: function(){
        this.setState({showRideDescriptionModal: false});
    },
	
	render: function () {
		var self = this;
		var dd = new Date(this.state.ride.date);
		var date = dd.getFullYear() + '/' + (dd.getMonth() + 1) + '/' + dd.getDate()  
        var hours = dd.getHours();
        var minutes = dd.getMinutes();
        var time = hours + ':' + minutes;
        var dot = false;
        var noDot = true;
        if(this.state.ride.description.length > 100) {
        	dot = true;
        	noDot = false;
        }
                
		return (
			<tr>
				<td><span className="ride"></span><p>{this.state.ride.rideName}</p></td>
				{ dot && <td onClick={this.handleShowRideDescriptionModal} className="ride-description">
				    <p className="pointerCss spanSpace">{this.state.description}...</p>
				</td>}
				{ noDot && <td onClick={this.handleShowRideDescriptionModal} className="ride-description">
				    <p className="pointerCss">{this.state.description}</p>
				</td>}
				<td><p>{date}</p></td>
				<td><p>{time}</p></td>
				<td className="centerElement pointerCss" onClick={this.handleShowRideMembersModal}><p className="pointerCss">{this.state.ride.member.length}</p></td>
				{this.state.showRideMembersModal ? <RideMembersModal handleHideRideMembersModal={this.handleHideRideMembersModal} token={this.props.token} rideID={this.state.ride.rideID}/> : null}
				{this.state.showRideDescriptionModal ? <RideDescriptionModal handleHideRideDescriptionModal={this.handleHideRideDescriptionModal} rideName={this.state.ride.rideName} time={this.state.ride.time} date={this.state.ride.date} description={this.state.ride.description}/> : null}
			</tr>
			
			
		);
	}
});
