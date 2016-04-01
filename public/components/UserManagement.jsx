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
			value:"select",
			name: 'vidhi',
			noOfPages: null,
			pageNo : 1,
			disablePrevious : true,
			disableNext : false,
		    notAvailable : false,
			result : true,
			noResult : false,
			filterResult : [],
			filterData : false,
			showButton : true,
			showAlert: false,
			action : "emptyFilterInput",
			message : "Fields cannot be left blank",
			filterClass : "filter-block",
			lengthToChild : null,
			noFilterData : false
		}
	},
	componentWillMount: function(){ 
		this.pagination();
		
	},

	pagination : function() {
        var currentThis = this,
		pages = null,
		LOD = null;
		var requestData = {};
		requestData.token = this.state.token;
		services.GET(config.url.getAllUser, requestData)
		.then(function(data){
			
			LOD = data.response.lengthOfDocument;
			if((LOD<10&&LOD>0)||LOD==10){
                pages = 1;
                currentThis.setState({
                	disableNext:true,
                	disablePrevious:true,
                	showButton: false
                });
			}else if(LOD==0){
				
			    currentThis.setState({notAvailable : true});
		    }else {

			    pages = LOD/allUrlData.pageSize;
			    currentThis.setState({disablePrevious : true, disableNext : false});
		    }
        currentThis.setState({
			userList:data.response.result,noOfPages : Math.ceil(pages), pageNo : 1});
		}) 		
		.catch(function(error){
		})
	},

	handleHideAlertModal: function(value){
		
        this.setState({showAlert: false});
        
    },

    fromParent : function(value) {
    
    	this.props.doActive(value);
    },

    filterLength : function() {
    	var length = this.state.lengthToChild-1;
    	this.setState({
    		lengthToChild : length
    	});

    	if(length==0) {
    		this.setState({
    		noFilterData : true
    	});
    	}
    	
    },

	render: function() {
		var self = this;
	
		if(this.state.notAvailable){
			
		    return (
		    
			    <div className="main user-mgt-page common-table">
				    <div className="main-content">
				        <div className="page-title">
					        <h1>All Users Details</h1>
				        </div>
				        
				        <div className="content home-page">
				            <div className="noData"><b>No users present</b></div>
			            </div>
		            </div>
		        </div>
		    )
	    } else {
	    	
		    return (
			    <div className="main user-mgt-page common-table">
                    <div className="main-content">
					    <div className="page-title">
                   <span className="ride"></span>
	                        <h1>All Users Details</h1>
	                        <div className={this.state.filterClass}>
	                            <a href="javascript:void(0)" onClick={this._onFilter}></a>
	                        </div>
	                    </div>
					    <div className="content">
							    {this.state.userFilter &&
			                    <div className="filter-form customForm">
								    <form onSubmit={this._onClick}>
								        <table>
									        <tbody>
										        <tr>
											        <td><label>Name</label></td>
											        <td><input type="text" name="filterByName" id="filterByName" onChange={this._onchange} className="filter-input"/></td>
											    </tr>
											    <tr>
											        <td><label>Email</label></td>
											        <td> <input type="email" name="filterByEmail" id="filterByEmail" onChange={this._onchange}/></td>
										        </tr> 
										        <tr>
											        <td colSpan="3">
												        <div className="button-block text-left">
													        <button type="reset" onClick={this._onFilter}>Reset</button>
													        <button onSubmit={this._onClick}>Search</button>
												        </div>
											        </td>
										        </tr>
									        </tbody>
								        </table>
								    </form>
								    {this.state.showAlert ? <AlertModal handleHideAlertModal={this.handleHideAlertModal} action={this.state.action} message={this.state.message}/> : null}
						    </div>}
						    {this.state.result &&
						    	<div>
						            <table cellSpacing="0" cellPadding="25">
							            <th className="sortOrder"><p>User Name<div className="sortButton"><button type="button"><span onClick={this._onSorting} id="ascendingName" className="glyphicon glyphicon-triangle-top"></span></button><button type="button"><span onClick={this._onSorting} id="descendingName" className="glyphicon glyphicon-triangle-bottom"></span></button></div></p></th>
							            <th>Email</th>
							            <th>Number</th>
							            <th>Number of Clubs Joined</th>
							            <th></th>
							            <tbody>
								            {this.state.userList.map(function(user){
									            
			  						           return <UserList user={user} token={self.state.token} key={user.userID} fromParent={self.fromParent}/> 
			  					           })}
			  				           </tbody>
						            </table>
						            {this.state.showButton &&
						            <div className="text-right arrow-sign">
					                    <button type="button" className="btn prevBtn" onClick={this._onPaginationPrevious} name="previous" disabled={this.state.disablePrevious}>Previous</button>&nbsp; 
					                    <button type="button" className="btn nextBtn" onClick={this._onPaginationNext} name="next" disabled={this.state.disableNext}>Next</button>
                                    </div>}
                                </div>
                            }
                            {this.state.filterData &&
						    	<div>
						            <table cellSpacing="0" cellPadding="25">
							            <th><p>User Name</p></th>
							            <th>Email</th>
							            <th>Number</th>
							            <th>Number of Clubs Joined</th>
							            <th></th>
							            <tbody>
								            {this.state.filterResult.map(function(user){
									            
			  						           return <UserList user={user} token={self.state.token} key={user.userID} fromParent={self.fromParent} filterLength={self.filterLength}/> 
			  					           })}
			  				           </tbody>
						            </table>
						            {this.state.showButton &&
						            <div className="text-right arrow-sign">
					                    <button type="button" className="btn prevBtn" onClick={this._onPaginationPrevious} name="previous" disabled={this.state.disablePrevious}>Previous</button>&nbsp; 
					                    <button type="button" className="btn nextBtn" onClick={this._onPaginationNext} name="next" disabled={this.state.disableNext}>Next</button>
                                    </div>}
                                </div>
                            }
                            { this.state.noFilterData &&
                        	<div>
						        <table cellSpacing="0" cellPadding="25" className="club-details">
						        	<tr>
										<td colSpan="5" className="no-Club">
											<div className="page-title">
												<span className="users"></span>
												<h4>No users available.</h4>
											</div>
										</td>
									</tr>
						        </table>
                            </div>

                        }
                            {this.state.noResult &&
							    <div className="filter-form">
							        <label>
								        <div className="noData">
										    <p>No result found</p>
									    </div>
									</label>
						        </div>
						    }
					    </div>
				    </div>
				    
			    </div>
			)
        }
    
	},
	_onSorting: function(e){
		
		var userListToSort = this.state.userList;
		if(e.target.id === "ascendingName"){
			userListToSort.sort(function(a,b) {return (a.userName > b.userName) ? 1 : ((b.userName > a.userName) ? -1 : 0);} ); 
			this.setState({
				clubs: userListToSort
			});
		}
		else if(e.target.id === "descendingName"){
			userListToSort.sort(function(a,b) {return (a.userName > b.userName) ? -1 : ((b.userName > a.userName) ? 1 : 0);} ); 
			this.setState({
				clubs: userListToSort
			});	
		}
	},
	_onFilter: function(){

        if(this.state.userFilter==false) {
        	this.setState({filterClass : "filter-block active"});
        }else if(this.state.userFilter==true) {
        	this.setState({filterClass : "filter-block"});
        	this.pagination();
        }
		var self = this;
		self.pagination();
		this.setState({
			userFilter: !this.state.userFilter,
			noResult : false,
			result : true,
			filterData : false
		});
		
	},

	_onchange: function(event){
		
	    if(event.target.name == "filterByEmail"){
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

	_onClick: function(event){
		event.preventDefault();
		var input1 = $("#filterByName").val();
		var input2 = $("#filterByEmail").val();
		if((input1==null||input1=="")&&(input2==null||input2=="")) {
            this.setState({showAlert: true, message: "Fields cannot be left blank."});
		}else {
		var currentThis = this;
		var requestData = {};
		requestData.token = this.state.token;
		requestData.name = this.state.filterByName;
		requestData.email = this.state.filterByEmail;
		services.GET(config.url.getAllUser, requestData)
		.then(function(data){
			
			var LOD = data.response.lengthOfDocument;
			
			if((LOD<10&&LOD>0)||LOD==10){
				
                pages = 1;
                currentThis.setState({disableNext:true, disablePrevious:true, showButton : false});
			}else if(LOD==0){
			    currentThis.setState({showAlert : true, action: "noFilterResult", message: "No result found."});

		    }else {
		    	
			    pages = LOD/allUrlData.pageSize;
			    currentThis.setState({disablePrevious:true,disableNext:false, showButton : true});
		    }
			if(LOD){
			    currentThis.setState({
				    filterResult:data.response.result,
				    filterData : true,
				    result : false,
				    noOfPages : Math.ceil(pages),
				    lengthToChild : LOD,
				    pageNo : 1
			    });
		    }else {
		    	currentThis.setState({
		    		result :true
		    	});
		    }
		}) 		
		.catch(function(error){
		})
	}
	},

	_onPaginationPrevious: function(event){
		var currentThis = this;
		if(this.state.pageNo==this.state.noOfPages-1) {
			this.setState({disableNext : false})
		}
		
		var decrement = this.state.pageNo;
		
		var minus = null;
		
		if(decrement==1){
			this.setState({disablePrevious : true,disableNext:false})
		}else if(decrement==2){
		   
		    decrement=decrement-1;
		    this.setState({pageNo : decrement});
		    
		if(this.state.filterData){
			var requestData = {
		        token: this.state.token,
			    pageSize:allUrlData.pageSize,
			    pageNumber: this.state.pageNo-1,
			    name : this.state.filterByName,
			    email : this.state.filterByEmail
			};

		}else{
			var requestData = {
				token: this.state.token,
			    pageSize:allUrlData.pageSize,
			    pageNumber: this.state.pageNo-1
			};
		}
			services.GET(config.url.getAllUser, requestData)
			.then(function(data){
				if(currentThis.state.filterData) {
					currentThis	.setState({filterData: false});
					currentThis.setState({
					
					filterResult : data.response.result,
					filterData : true,
					disablePrevious : true,
					disableNext: false,
				});
				
				}else {
					currentThis.setState({
						userList:data.response.result, 
						disablePrevious : true, 
						disableNext: false
					});
				}
			})
			.catch(function(error){
			});	
		}else {
			decrement=decrement-1;
		    this.setState({pageNo : decrement,disableNext:false});
		    if(this.state.filterData){
				var requestData = {
			        token: this.state.token,
				    pageSize:allUrlData.pageSize,
				    pageNumber: this.state.pageNo-1,
				    name : this.state.filterByName,
				    email : this.state.filterByEmail
				};

			}else {
		    var requestData = {
				token: this.state.token,
			    pageSize:allUrlData.pageSize,
			    pageNumber: this.state.pageNo-1
			};
		}
			services.GET(config.url.getAllUser, requestData)
			.then(function(data){
				if(currentThis.state.filterData) {
					currentThis	.setState({filterData: false});
					currentThis.setState({
					
					filterResult : data.response.result,
					filterData : true
				});
				
				}else {
					currentThis.setState({userList:data.response.result});
				}
			})
			.catch(function(error){
			});
		}
	},

	_onPaginationNext: function(event){
		var currentThis = this;
		var increment = this.state.pageNo;
		this.setState({disablePrevious: false});
		
        increment = increment+1;
		if(increment==this.state.noOfPages){
			this.setState({disableNext : true})
		}
			
		this.setState({pageNo : increment}); 
		if(this.state.filterData){
			var requestData = {
		        token: this.state.token,
			    pageSize:allUrlData.pageSize,
			    pageNumber: this.state.pageNo+1,
			    name : this.state.filterByName,
			    email : this.state.filterByEmail
			};

		}else {
		var requestData = {
		    token: this.state.token,
			pageSize:allUrlData.pageSize,
			pageNumber: this.state.pageNo+1
		};
	}
	
		services.GET(config.url.getAllUser, requestData)
		.then(function(data){
			
			if(currentThis.state.filterData) {
				currentThis	.setState({filterData: false});
					currentThis.setState({
					
					filterResult : data.response.result,
					filterData : true
				});
				
			}else {
				currentThis.setState({
					userList:data.response.result
				});
			}
			
		})
		.catch(function(error){
		});	
		
		
	}
	
});