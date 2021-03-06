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
			notAvailable : false,
			result : true,
			noResult : false,
			filterResult : [],
			filterData : false,
			showButton : true,
			action : "emptyFilterInput",
			message : "Fill up the fields first.",
			filterClass : "filter-block", 
			myCheckbox : false,
			checked : false,
			location : false,
			userID : null
			

		} 
	},

	commonApi : function(requestData) {
		var self = this;
		var pages = null,
		LOD = null;
		services.POST(config.url.getAllClub, requestData)
			.then(function(data){
			
			LOD = data.response.lengthOfDocument;

			if((LOD<10&&LOD>0)||LOD==10){
                pages = 1;
                self.setState({disablePrevious:true,disableNext:true, showButton: false});
			}else if(LOD==0){
				self.setState({notAvailable : true});
		    }else {
			    pages = LOD/allUrlData.pageSize;
			}
		    self.setState({clubs:data.response.result, noOfPages : Math.ceil(pages)});
		})
		.catch(function(error){
				
		});	
	},

	componentWillMount: function () {
		
		this.setState({checked: true});
		var self = this;
		
		if(this.props.location.state) {
			
			self.setState({clubFilter : true, myCheckbox : true, checked: true, loaction: true});
			var userID = this.props.location.state.userID;
			self.setState({userID : userID});
			var requestData = {
				token: self.state.token,
				userID : userID
			};
			self.commonApi(requestData);
			
		}else {
		
		var requestData = {
			token: self.state.token
			
		};
		self.commonApi(requestData);
		
		}
	},
    
    handleHideAlertModal: function(value){
		
        this.setState({showAlert: false});
        
    },
    checkboxClicked: function() {
    	this.setState({pageNo : 1, disablePrevious : true, disableNext : false});
    	var self = this;
    	if($("#checkbox").is(":checked")){
    		var requestData = {
				token: self.state.token,
				userID : self.state.userID
			};
			self.commonApi(requestData);
    	}else {
    		var requestData = {
				token: self.state.token
			};
			self.commonApi(requestData);
    	}
    },

	render: function (){
		var currentThis = this;
		
		if(this.state.notAvailable){
			
		    return (
		    
			    <div className="main user-mgt-page common-table">
				    <div className="main-content">
				        <div className="page-title">
					        <h1>Clubs</h1>
				        </div>
				        
				        <div className="content home-page">
				            <div><b>No clubs present</b></div>
			            </div>
		            </div>
		        </div>
		    )
	    }else {
		    return (
			    <div className="main user-mgt-page-filtered common-table expandable">
				    <div className="main-content">
				        <div className="page-title">
					        <h1>Clubs</h1>
					        <div className={this.state.filterClass}>
						        <a href="javascript:void(0)" onClick={this._onFilter}></a>
					        </div>
				        </div>
				    <div className="content">
				        {this.state.clubFilter &&
							    <div className="filter-form customForm">
							    <form onSubmit={this._onFilterClick}>
								    <table>
									    <tbody>
										    <tr>
											    <td><label>Club Name</label></td>
											    <td className="errorMess"><span>{this.state.oldPasswordError}</span></td>
											    <td><input type="text" name="filterByClubName" id="filterByClubName" onChange={this._onchange}/></td>
											    <td className="errorMess"><span>{this.state.oldPasswordError}</span></td>
											    
										    </tr>
										    {this.state.myCheckbox &&

										    <tr>
										    	<td colSpan="2"><label>My clubs:</label></td>
											    <td colSpan="2" className="checkboxDefault">
													<div className="text-left">
											    		<input type="checkbox" id="checkbox" className="customCheckbox" onClick={this.checkboxClicked} defaultChecked={this.state.checked}/>
											    	</div>
											    </td>
										    </tr>
										    }
										    <tr>
											    <td colSpan="4">
												    <div className="button-block text-left">
													    <button type="reset">Reset</button>
													    <button onSubmit={this._onFilterClick}>Search</button>
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
					            <table cellSpacing="0" cellPadding="25" className="club-details">
					                <tr>
						            <th>Club Name</th>
						            <th>Creator Name</th>
						            <th>Date</th>
						            <th></th>
						            <th></th>
						            </tr>
						            
							            {this.state.clubs.map(function(club){
							        	    return <ClubList token={currentThis.state.token} club={club} key={club.clubId}/>
							            })}
						            
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
						        <table cellSpacing="0" cellPadding="25" className="club-details">
						            <tr>
							            <th>Club Name</th>
						                <th>Creator Name</th>
						                <th>Date</th>
						                <th></th>
						                <th></th>
						            </tr>
							        <tbody>
								        {this.state.filterResult.map(function(club){
									        
			  						       return <ClubList token={currentThis.state.token} club={club} key={club.clubId}/>
			  					       })}
			  				       </tbody>
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
						</div>}
				    </div>
			    </div>
		    </div>
		    )
        }
	},
	_onFilter: function(){
		if(this.state.clubFilter==false) {
        	this.setState({filterClass : "filter-block active"});
        }else if(this.state.clubFilter==true) {
        	this.setState({filterClass : "filter-block"});
        }

		this.setState({
			clubFilter: !this.state.clubFilter,
			noResult : false,
			result : true,
			filterData : false
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
		   if($("#checkbox").is(":checked")) {
			var requestData = {
				token: this.state.token,
				userID : this.state.userID,
			    pageSize:allUrlData.pageSize,
			    pageNumber: this.state.pageNo-1
			};
		}else {
			var requestData = {
					token: this.state.token,
				    pageSize:allUrlData.pageSize,
				    pageNumber: this.state.pageNo-1
				};
		}
			services.POST(config.url.getAllClub, requestData)
			.then(function(data){
				
				currentThis.setState({clubs:data.response.result, disablePrevious : true, disableNext: false});
			})
			.catch(function(error){
				
			});	
		}else {
			decrement=decrement-1;
		    this.setState({pageNo : decrement});
		   
		   	if(this.state.location) {
				var requestData = {
					token: this.state.token,
					userID : this.state.userID,
				    pageSize :allUrlData.pageSize,
				    pageNumber: this.state.pageNo-1
				};
			}else {
				var requestData = {
					token: this.state.token,
				    pageSize:allUrlData.pageSize,
				    pageNumber: this.state.pageNo-1
				};
			}
			services.POST(config.url.getAllClub, requestData)
			.then(function(data){
				currentThis.setState({clubs:data.response.result});
			})
			.catch(function(error){
					
			});
		}
	},

	_onPaginationNext: function(event){
		var currentThis = this;
		var increment = this.state.pageNo;

		this.setState({disablePrevious : false});
		
        increment = increment+1;

		if(increment==this.state.noOfPages){
			this.setState({disableNext : true});
		}
			
		    this.setState({pageNo : increment});
		    
		    if($("#checkbox").is(":checked")) {
		    	
		    	var requestData = {
		        token: this.state.token,
		        userID : this.state.userID,
			    pageSize:allUrlData.pageSize,
			    pageNumber: this.state.pageNo+1
			};
		    }else {
		    
			var requestData = {
		        token: this.state.token,
			    pageSize:allUrlData.pageSize,
			    pageNumber: this.state.pageNo+1
			};
		}
			services.POST(config.url.getAllClub, requestData)
			.then(function(data){
				currentThis.setState({
					clubs:data.response.result
				});
				
			})
			.catch(function(error){
					
			});	
		
		
	},

	_onFilterClick: function(event){
        event.preventDefault();
		var input1 = $("#filterByClubName").val();
		
		if(input1==null||input1=="") {
            this.setState({showAlert: true});
		}else {
		    var currentThis = this;
		    var requestData = {
			    token : this.state.token,
			    clubName : this.state.filterByClubName
		    };
		    
		    services.POST(config.url.getAllClub, requestData)
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
			    if(data.response.result.length){
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
	}
});
