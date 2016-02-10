var allUrlData = {
	pageSize: 10
}

var UserManagement = React.createClass({
	getInitialState: function (){
		return {
			token: localStorage.getItem("wikedrideSuperAdminIsLogin") ? JSON.parse(localStorage.getItem("wikedrideSuperAdminIsLogin")).token : "",
			userList:[],
			clubList:[{name:"ram",_id:341},
					{name:"ram",_id:341}],
			designations:[{name:"ram1"},{name:"ram2"}],
			userFilter:false,
			filterByName:"",
			filterByEmail:"",
			filterByDesignation:"",
			value:"select",
			name: 'vidhi',
			noOfPages: null,
			pageNo : 1,
			disablePrevious : true,
			disableNext : false
		}
	},
	componentWillMount: function(){ 
		var currentThis = this,
		pages = null,
		LOD = null;
		var requestData = {};
		requestData.token = this.state.token;
		services.GET(config.url.getAllUser, requestData)
		.then(function(data){

			LOD = data.response.lengthOfDocument;
			pages = LOD/allUrlData.pageSize;

			currentThis.setState({
				userList:data.response.result
			});
		}) 		
		.catch(function(error){
			console.log(error)
		})
	},
	render: function() {
		var self = this;
		console.log("___________________________________________",this.state.name);
		return (
			<div className="main user-mgt-page common-table">
                <div className="main-content">
					<div className="page-title">
	                    <h1>All Users Details</h1>
	                    <div className="filter-block">
	                        <a href="#" onClick={this._onFilter}></a>
	                    </div>
	                </div>
					<div className="content">
							{	this.state.userFilter &&
								<div className="filter-form">
								<table>
									<tbody>
										<tr>
											<td style={{width:'100px'}}><label>Name</label></td>
											<td><input type="text" name="filterByName" onChange={this._onchange}/></td>
											<td style={{width:'100px'}}><label>Email</label></td>
											<td> <input type="email" name="filterByEmail" onChange={this._onchange}/></td>
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
						<table cellSpacing="0" cellPadding="25">
							<th><p>User Name</p></th>
							<th>Email</th>
							<th>Number</th>
							<th>Number of Clubs Joined</th>
							<th></th>
							<tbody>
								{this.state.userList.map(function(user){
									console.log("%%%%%%%%%%%%",user);
			  						return <UserList user={user} token={self.state.token} key={user.userID}/> 
			  					})}
			  				</tbody>
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
			userFilter: !this.state.userFilter
		});
	},
	_onchange: function(event){
		
		if(event.target.name == "filterByDesignation"){
			this.setState({
				filterByDesignation: event.target.value
			});
		}
		else if(event.target.name == "filterByEmail"){
			this.setState({
				filterByEmail: event.target.value
			});
		}
		else if( event.target.name == "filterByName"){
			this.setState({
				filterByName: event.target.value
			});
		}
	}, 
	_onClick: function(){
		var currentThis = this;
		var requestData = {};
		requestData.token = this.state.token;
		requestData.name = this.state.filterByName;
		requestData.email = this.state.filterByEmail;
		requestData.designation = this.state.filterByDesignation;
		services.POST(config.url.userListFilter, requestData)
		.then(function(data){
			currentThis.setState({
				userList:data.response.result
			});
		}) 		
		.catch(function(error){
			console.log(error)
		})
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
			services.POST(config.url.getAllUser, requestData)
			.then(function(data){
				currentThis.setState({
				userList:data.response.result
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
			services.POST(config.url.getAllUser, requestData)
			.then(function(data){
				
				currentThis.setState({
				userList:data.response.result
			});
				console.log("newwwwwwwww",currentThis.state.userList);
			})
			.catch(function(error){
				console.log("====catch",error);	
			});	
		}
		
	}
	
});