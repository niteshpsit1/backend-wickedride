var allUrlData = {
	pageSize: 2
}
var ClubManagement = React.createClass({
	getInitialState: function(){
		return {
			token: localStorage.getItem("wikedrideSuperAdminIsLogin") ? JSON.parse(localStorage.getItem("wikedrideSuperAdminIsLogin")).token : "",
			clubs:[],
			showClubMenberList:false,
			ClubMembers:[],
			pageNumber: 1
		}
	},
	componentWillMount: function () {
		var currentThis = this;
		var requestData = {
			token: this.state.token
			//pageSize:config.pagination.pageSize,
			//createdOn: this.state.clubs.length ? this.state.clubs[allUrlData.pageSize-1].createdOn : null
		};
		services.POST(config.url.getAllClub, requestData)
		.then(function(data){
			console.log(data);
			currentThis.setState({
				clubs:data.response.result
			});
		})
		.catch(function(error){
			console.log("====catch",error);	
		});	
	},
	render: function (){
		var currentThis = this;
		return (
			<div className="main user-mgt-page-filtered common-table expandable">
				<div className="page-title">
					<h1>All Club Details</h1>
					<div className="filter-block">
						<a href="#" onClick={this._onFilter}></a>
					</div>
				</div>
				<div className="content">
					<table cellspacing="0" cellpadding="25" className="club-details">
						<th><p>Club Name</p></th>
						<th>Creator Name</th>
						<th>Date</th>
						<th>Time</th>
						<th></th>
						<tbody>
							{this.state.clubs.map(function(club){
								return <ClubList token={currentThis.state.token} club={club}/>
							})}
						</tbody>
					</table>
				</div>
			</div>
		);
	},
	_onFilter: function(){
		this.setState({
			userFilter: !this.state.userFilter
		});
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