var AllUrl = {
	pageSize: 5
}

var ClubList = React.createClass({
	getInitialState: function(){
		return ({
			club: {},
			clubMembers: false,
			clubMembersList:[],
			clubDelete: true,
			totalRides: false,
			clubRideList:[]
		});
	},
	componentWillMount: function(){
		this.setState({
			club: this.props.club
		});
	},
	render: function () {
		var currentThis = this;
		var time = Date.parse(this.props.club.date);
		return (
			<div>
				{ 	this.state.clubDelete &&
					<div>
					<div className="row">
					<div className="well col-md-2">{this.props.club.clubName}:</div>
					<div className="well col-md-2">{this.props.club.creatorName}</div>
					<div className="well col-md-2">{this.props.club.date}</div>
					<div className="well col-md-2">{this.props.club.time}</div>
					<div className="well col-md-2"><a onClick={this._onClick} href="#"><div name="totalRides">see total Rides</div></a></div>
					<div className="well col-md-1"><a onClick={this._onClick} href="#"><div name="clubDelete">Delete Club</div></a></div>
					<div className="well col-md-1"><a onClick={this._onClick} href="#"><div name="clubMembers">see membses</div></a></div>
				
					{ 	this.state.totalRides &&
						<div>
						<div className="row">
							<div className="well col-md-3">Ride Name</div>
							<div className="well col-md-3">Description</div>
							<div className="well col-md-2">start Date</div>
							<div className="well col-md-2">state Time</div>
							<div className="well col-md-2">Members</div>
						</div>
						{this.state.clubRideList.map(function(ride){
							return <ClubRidesList ride={ride}/>
						})}
						</div>
					}

					{	this.state.clubMembers &&
						<div>
						<div className="row">
							<div className="well col-md-3">User Name</div>
							<div className="well col-md-3">Designation</div>
							<div className="well col-md-3">Awards</div>
							<div className="well col-md-3">Number of clubs joined</div>
						</div>
						{this.state.clubMembersList.map(function(member){
							return <ClubMembers member={member}/>
						})}
						</div>
					}

					</div>
					</div>
				}
			</div>
		);
	},
	_onClick: function(event){

		var currentThis = this;
		var data = {}
		data.id = $(event.target).attr("name")
		if($(event.target).attr("name") == "clubDelete"){
			if(confirm("club will detele permanently") == true) {
				this.setState({
					clubDelete: false
				})
			}
		}
		else if($(event.target).attr("name") == "clubMembers"){
			
			if(!this.state.clubMembers){
				var requestData = {}
				requestData.token = this.props.token;
				requestData.clubID = this.props.club.clubId; 
				services.POST(config.url.getClubMembers, requestData)
				.then(function(data){
					currentThis.setState({
						clubMembers: !currentThis.state.clubMembers,
						clubMembersList: data.response,
						totalRides:false
					});
				})
				.catch(function(error){
					console.log("error",error)
				});
			}
			else{
				this.setState({
					clubMembers: !this.state.clubMembers,
					totalRides:false
				});
			}
		}
		else if($(event.target).attr("name") == "totalRides"){
			
			if(!this.state.totalRides){
				var requestData = {}
				requestData.token = this.props.token;
				requestData.clubID = this.props.club.clubId; 
				services.POST(config.url.getClubRides, requestData)
				.then(function(data){
					currentThis.setState({
						clubMembers: false,
						totalRides: true,
						clubRideList:data.response.result
					})
				})
				.catch(function(error){
					console.log("error",error)
				});
			}
			else{
				this.setState({
					clubMembers: false,
					totalRides:false
				});
			}
		}
	}
});
