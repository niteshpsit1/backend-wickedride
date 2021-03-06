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
			disableNext : false,
		    notAvailable : false,
			result : true,
			noResult : false,
			filterResult : [],
			filterData : false,
			showButton : true,
			showAlert: false,
			action : "emptyFilterInput",
			message : "Fill up the fields first.",
			filterClass : "filter-block"
		}
	},
	componentWillMount: function(){ 
		this.pagination();
		/*this.props.doActive();*/
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
                currentThis.setState({disableNext:true,disablePrevious:true,showButton: false
                });
			}else if(LOD==0){
				
			    currentThis.setState({notAvailable : true});
		    }else {

			    pages = LOD/allUrlData.pageSize;
		    }
        currentThis.setState({
			userList:data.response.result,noOfPages : Math.ceil(pages)});
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
													        <button type="reset">Reset</button>
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
							            <th><p>User Name</p></th>
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
						            <div className="text-right arrow-sign">
					                    <button type="button" className="btn prevBtn" onClick={this._onPaginationPrevious} name="previous" disabled={this.state.disablePrevious}>Previous</button>&nbsp; 
					                    <button type="button" className="btn nextBtn" onClick={this._onPaginationNext} name="next" disabled={this.state.disableNext}>Next</button>
                                    </div>
                                </div>
                            }
                            {this.state.filterData &&
						    	<div>
						            <table cellSpacing="0" cellPadding="25">
							            <th><p>User Name</p></th>
							            <th>Email</th>
							            <th>Number</th>
							            <th>Number of Clubs Joined</th>
							            <tbody>
								            {this.state.filterResult.map(function(user){
									            
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

	_onFilter: function(){

        if(this.state.userFilter==false) {
        	this.setState({filterClass : "filter-block active"});
        }else if(this.state.userFilter==true) {
        	this.setState({filterClass : "filter-block"});
        }
		var self = this;
		self.pagination();
		this.setState({
			userFilter: !this.state.userFilter,
			noResult : false,
			result : true,
			filterData : false
		});
		/*this.pagination();*/
		
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
	_onClick: function(event){
		event.preventDefault();
		var input1 = $("#filterByName").val();
		var input2 = $("#filterByEmail").val();
		if((input1==null||input1=="")&&(input2==null||input2=="")) {
            this.setState({showAlert: true});
		}else {
		var currentThis = this;
		var requestData = {};
		requestData.token = this.state.token;
		requestData.name = this.state.filterByName;
		requestData.email = this.state.filterByEmail;
		requestData.designation = this.state.filterByDesignation;
		services.POST(config.url.userListFilter, requestData)
		.then(function(data){
			var LOD = data.response.result.length;
			if((LOD<10&&LOD>0)||LOD==10){
                pages = 1;
                currentThis.setState({disableNext:true,disablePrevious:true});
			}else if(LOD==0){
			    currentThis.setState({showAlert : true, action: "noFilterResult", message: "No result found."});
		    }else {
			    pages = LOD/allUrlData.pageSize;
		    }
			if(LOD){
			    currentThis.setState({
				    filterResult:data.response.result,
				    filterData : true,
				    result : false,
				    noOfPages : Math.ceil(pages)
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
		    
		    
			var requestData = {
				token: this.state.token,
			    pageSize:allUrlData.pageSize,
			    pageNumber: this.state.pageNo-1
			};
			services.GET(config.url.getAllUser, requestData)
			.then(function(data){
				currentThis.setState({userList:data.response.result, disablePrevious : true, disableNext: false});
			})
			.catch(function(error){
			});	
		}else {
			decrement=decrement-1;
		    this.setState({pageNo : decrement});
		    var requestData = {
				token: this.state.token,
			    pageSize:allUrlData.pageSize,
			    pageNumber: this.state.pageNo-1
			};
			services.GET(config.url.getAllUser, requestData)
			.then(function(data){
				currentThis.setState({userList:data.response.result});
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
		
		var requestData = {
		    token: this.state.token,
			pageSize:allUrlData.pageSize,
			pageNumber: this.state.pageNo+1
		};
		services.GET(config.url.getAllUser, requestData)
		.then(function(data){
			
			currentThis.setState({
			userList:data.response.result
		});
			
		})
		.catch(function(error){
		});	
		
		
	}
	
});