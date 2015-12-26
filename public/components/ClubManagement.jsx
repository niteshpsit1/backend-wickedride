var allUrlData = {
	pageSize: 2
}
var ClubManagement = React.createClass({
	getInitialState: function(){
		return {
			clubs:[],
			showClubMenberList:false,
			ClubMembers:[],
			pageNumber: 1
		}
	},
	componentWillMount: function () {
		var currentThis = this;
		var requestData = {
			token: this.props.token
			//pageSize:config.pagination.pageSize,
			//createdOn: this.state.clubs.length ? this.state.clubs[allUrlData.pageSize-1].createdOn : null
		};
		services.POST(config.url.getAllClub, requestData)
		.then(function(data){
			currentThis.setState({
				clubs:data.response
			});
		})
		.catch(function(error){
			console.log("====catch",error);	
		});	
	},
	render: function (){
		var currentThis = this;
		return (
			<div>
			<div className="row">
				<div className="well col-md-3">club Name</div>
				<div className="well col-md-3">creator name</div>
				<div className="well col-md-3">Date</div>
				<div className="well col-md-3">Time</div>
			</div>
			{this.state.clubs.map(function(club){
				return <ClubList token={currentThis.props.token} club={club}/>
			})}
			</div>
		);
	},
	_onClick: function(event){
		var currentThis = this;
		if($(event.target).attr("name") == "prev"){
			alert("can't see pvevious records");
		}
		else if($(event.target).attr("name") == "next"){
			var requestData = {
			pageSize:allUrlData.pageSize,
			createdOn: this.state.clubs.length ? this.state.clubs[allUrlData.pageSize-1].createdOn : null
			};
			services.POST(config.url.getAllClub, requestData)
			.then(function(data){
				currentThis.setState({
					clubs:data.response
				});
			})
			.catch(function(error){
				console.log("====catch",error);	
			});	
		}
	}
});