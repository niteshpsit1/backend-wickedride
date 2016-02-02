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
			<tr>
				<td><p>{this.props.club.clubName}</p></td>
				<td><p>{this.props.club.creatorName}</p></td>
				<td><p>{this.props.club.date}</p></td>
				<td><p>{this.props.club.time}</p></td>
				<td><a href="#" className="users"></a> <a href="#" className="gallery"></a> <a href="#" className="ride"></a></td>
			</tr>
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
