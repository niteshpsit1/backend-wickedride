var allUrlData = {
	pageSize: 10
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
			designations:[{name:"ram1"},{name:"ram2"}],
			noOfPages: null,
			pageNo : 1,
			disablePrevious : true,
			disableNext : false,
			filterByClubName : null
		}
	},
	
	componentWillMount: function () {
		
		var self = this,
		pages = null,
		LOD = null;
		var requestData = {
			token: self.state.token
			
		};
		services.POST(config.url.getAllClub, requestData)
		.then(function(data){
			
			LOD = data.response.lengthOfDocument;
			pages = LOD/allUrlData.pageSize;

			
			self.setState({clubs:data.response.result, noOfPages : Math.ceil(pages)});
		})
		.catch(function(error){
			console.log("====catch",error);	
		});	
	},

	render: function (){
		var currentThis = this;
		
		
		return (
			<div className="main user-mgt-page-filtered common-table expandable">
				<div className="main-content">
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
											
										</tr>
										
										<tr>
											<td colSpan="4">
												<div className="button-block">
													<button onClick={this._onFilterClick}>Filter</button>
												</div>
											</td>
										</tr>
									</tbody>
								</table>
						</div>}
					<table cellSpacing="0" cellPadding="25" className="club-details">
					    <tr>
						<th>Club Name</th>
						<th>Creator Name</th>
						<th>Date</th>
						<th>Time</th>
						<th></th>
						</tr>
						
							{this.state.clubs.map(function(club){

		
								
								    return <ClubList token={currentThis.state.token} club={club} key={club.clubId}/>
							
							})}
						
					</table>
					<div className="text-right">
					    <button type="button" className="btn btn-success" onClick={this._onPaginationPrevious} name="previous" disabled={this.state.disablePrevious}>Previous</button>&nbsp; 
					    <button type="button" className="btn btn-success" onClick={this._onPaginationNext} name="next" disabled={this.state.disableNext}>Next</button>
                        
					</div>
				</div>
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
		
		if(event.target.name == "filterByClubName"){
			this.setState({
				filterByClubName: event.target.value
			});
		}
		
	},

	_onPaginationPrevious: function(event){
		var currentThis = this;
		if(this.state.pageNo==this.state.noOfPages) {
			this.setState({disableNext : false})
		}
		
		var decrement = this.state.pageNo;
		
		var minus = null;
		
		if(decrement==1){
			this.setState({disablePrevious : true})
		}else {
		   
		    decrement=decrement-1;
		    this.setState({pageNo : decrement});
		    console.log("nooooooo",this.state.pageNo-1);
		    
		    
		
			var requestData = {
				token: this.state.token,
			    pageSize:allUrlData.pageSize,
			    pageNumber: this.state.pageNo-1
			};
			services.POST(config.url.getAllClub, requestData)
			.then(function(data){
				currentThis.setState({
					clubs:data.response.result
				});
			})
			.catch(function(error){
				console.log("====catch",error);	
			});	
		}
	},

	_onPaginationNext: function(event){
		var currentThis = this;
		var increment = this.state.pageNo;
		this.setState({disablePrevious: false});
		
        increment = increment+1;
		if(increment==Math.ceil(this.state.noOfPages)){
			this.setState({disableNext : true})
		}else {
			
		    this.setState({pageNo : increment});
		    console.log("noooooooooo",this.state.pageNo+1);
		
		    
		
			var requestData = {
		        token: this.state.token,
			    pageSize:allUrlData.pageSize,
			    pageNumber: this.state.pageNo+1
			};
			services.POST(config.url.getAllClub, requestData)
			.then(function(data){
				
				currentThis.setState({
					clubs:data.response.result
				});
				console.log("newwwwwwwww",currentThis.state.clubs);
			})
			.catch(function(error){
				console.log("====catch",error);	
			});	
		}
		
	},

	_onFilterClick: function(){

		var currentThis = this;
		var requestData = {
			token : this.state.token,
			clubName : this.state.filterByClubName
		};
		
		services.POST(config.url.getAllClub, requestData)
		.then(function(data){
			currentThis.setState({
				clubs:data.response.result
			});
		}) 		
		.catch(function(error){
			console.log(error)
		})
	}
});

/*clubs.length ? this.state.clubs[allUrlData.pageSize-1].createdOn : null*/