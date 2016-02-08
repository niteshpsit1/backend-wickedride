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
			pageNumber: 1,
			clubFilter:false,
			filterByClubName:"",
			filterByCreatorName:"",
			filterByDesignation:"",
			designations:[{name:"ram1"},{name:"ram2"}]
		}
	},
	componentWillMount: function () {
		var self = this;
		var requestData = {
			token: self.state.token
			
		};
		services.POST(config.url.getAllClub, requestData)
		.then(function(data){
			
			self.setState({clubs:data.response.result});
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
				    {this.state.clubFilter &&
							<div className="filter-form">
								<table>
									<tbody>
										<tr>
											<td style={{width:'100px'}}><label>Club Name</label></td>
											<td><input type="text" name="filterByClubName" onChange={this._onchange}/></td>
											<td style={{width:'100px'}}><label>Creator Name</label></td>
											<td> <input type="email" name="filterByCreatorName" onChange={this._onchange}/></td>
										</tr>
										<tr>
											<td style={{width:'100px'}}><label>Designation</label> </td>
											<td className="select-parent">
												<select name="filterByDesignation" onChange={this._onchange}>
													<option value="">Select</option>
													{	this.state.designations.map(function(designation){
															return <option value={designation.name}>{designation.name}</option>
														})
													}
												</select>
											</td>
										</tr>
										<tr>
											<td colspan="4">
												<div className="button-block">
													<button onClick={this._onClick}>Filter</button>
												</div>
											</td>
										</tr>
									</tbody>
								</table>
						</div>}
					<table cellSpacing="0" cellPadding="25" className="club-details">
						<th>Club Name</th>
						<th>Creator Name</th>
						<th>Date</th>
						<th>Time</th>
						<th></th>
						
							{this.state.clubs.map(function(club){
		
								
								    return <ClubList token={currentThis.state.token} club={club} key={club.clubId}/>
							
							})}
						
					</table>
				</div>
			</div>
		);
	},
	_onFilter: function(){
		this.setState({
			clubFilter: !this.state.clubFilter
		});
	},

	_onchange: function(event){
		
		if(event.target.name == "filterByDesignation"){
			this.setState({
				filterByDesignation: event.target.value
			});
		}
		else if(event.target.name == "filterByClubName"){
			this.setState({
				filterByClubName: event.target.value
			});
		}
		else if( event.target.name == "filterByCreatorName"){
			this.setState({
				filterByCreatorName: event.target.value
			});
		}
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