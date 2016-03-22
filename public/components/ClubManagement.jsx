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
			filterResult : [],
			filterData : false,
			showButton : true,
			action : "emptyFilterInput",
			message : "Field cannot be left blank.",
			filterClass : "filter-block", 
			myCheckbox : false,
			checked : false,
			location : false,
			userID : null,
			checking : false,
			username : null,
			lengthToChild : null,
			noFilterData : false,
			noResult:0

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
			    self.setState({disablePrevious:true,disableNext:false});
			}
			setTimeout(function(){
				self.setState({
			    	clubs:data.response.result,
			    	noOfPages : Math.ceil(pages),
			    	pageNo : 1,
			    	noResult:data.response.result.length
		    	});
			}, 0);
		})
		.catch(function(error) {
				
		});	
	},

	componentWillMount: function () {
		
		var self = this;
		
		if(this.props.location.state) {
			var name = this.props.location.state.name;
			self.setState({clubFilter : true, myCheckbox : true, loaction: true, checked: true, checking :  true, username : name});
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
    	var checked = this.state.checked;
    	this.setState({pageNo : 1, disablePrevious : true, disableNext : false, checked : !checked});
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

    filterLength : function() {
    	
    	this.setState({
    		noResult : this.state.noResult - 1
    	});
    },

	render: function (){
		
		var currentThis = this;
		var checked = false;
		if(this.state.checked) {
			checked = true;
		}else {
			checked = false;
		}	
		if(this.state.notAvailable){
			
		    return (
		    
			    <div className="main user-mgt-page common-table">
				    <div className="main-content">
				        <div className="page-title">
					        <h1>Clubs</h1>
				        </div>
				        
				        <div className="content home-page">
				            <div className="noData"><b>No clubs present</b></div>
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
										    	<td colSpan="2"><label>{this.state.username} clubs:</label></td>
											    <td colSpan="2" className="checkboxDefault">
													<div className="text-left">
											    		<input type="checkbox" id="checkbox" className="customCheckbox" onClick={this.checkboxClicked} defaultChecked={checked}/>
											    	</div>
											    </td>
										    </tr>
										    }
										    <tr>
											    <td colSpan="4">
												    <div className="button-block text-left">
													    <button type="reset" onClick={this._onFilter}>Reset</button>
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
						            <th className="sortOrder">Club Name<div className="sortButton"><button type="button"><span onClick={this._onSorting} id="ascendingName" className="glyphicon glyphicon-triangle-top"></span></button>
						            <button type="button" ><span onClick={this._onSorting} id="descendingName" className="glyphicon glyphicon-triangle-bottom"></span></button></div>
						            </th>
						            <th>Creator Name</th>
						            <th className="sortOrder">Date <div className="sortButton"><button type="button"><span onClick={this._onSorting} id="ascendingDate" className="glyphicon glyphicon-triangle-top"></span></button>
						            <button type="button"><span onClick={this._onSorting} id="descendingDate" className="glyphicon glyphicon-triangle-bottom"></span></button></div></th>
						            <th></th>
						            <th></th>
						            </tr>
						            
							            {this.state.clubs.map(function(club){
							        	    return <ClubList token={currentThis.state.token} club={club} key={club.clubId} filterLength={currentThis.filterLength}/>
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
									        
			  						       return <ClubList token={currentThis.state.token} club={club} key={club.clubId} length={currentThis.state.lengthToChild} filterLength={currentThis.filterLength}/>
			  					       })}
			  				       </tbody>
						        </table>
                            </div>
                        }
                        { this.state.noFilterData &&
                        	<div>
						        <table cellSpacing="0" cellPadding="25" className="club-details">
						        	<tr>
										<td colSpan="5" className="no-Club">
											<div className="page-title">
												<span className="users"></span>
												<h4>No clubs available.</h4>
											</div>
										</td>
									</tr>
						        </table>
                            </div>

                        }
					    { this.state.noResult == 0  &&
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
	_onSorting: function(e){
		
		var clubsToSort = this.state.clubs;
		if(e.target.id === "ascendingName"){
			clubsToSort.sort(function(a,b) {return (a.clubName > b.clubName) ? 1 : ((b.clubName > a.clubName) ? -1 : 0);} ); 
			this.setState({
				clubs: clubsToSort
			});
		}
		else if(e.target.id === "descendingName"){
			clubsToSort.sort(function(a,b) {return (a.clubName > b.clubName) ? -1 : ((b.clubName > a.clubName) ? 1 : 0);} ); 
			this.setState({
				clubs: clubsToSort
			});	
		}else if(e.target.id === "ascendingDate"){
			clubsToSort.sort(function(a,b) {return ((new Date(a.date))-(new Date(b.date)));} ); 
			this.setState({
				clubs: clubsToSort
			});	
		}else if(e.target.id === "descendingDate"){
			clubsToSort.sort(function(a,b) {return -((new Date(a.date))-(new Date(b.date)));} ); 
			this.setState({
				clubs: clubsToSort
			});	
		}
	},
	_onFilter: function(){
		if(this.state.clubFilter==false) {
        	this.setState({filterClass : "filter-block active"});
        }else if(this.state.clubFilter==true) {
        	this.setState({filterClass : "filter-block"});
        	var requestData = {
				token: this.state.token
			};
			this.commonApi(requestData);
        }
		this.setState({
			clubFilter: !this.state.clubFilter,
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
				
				currentThis.setState({
					clubs:data.response.result,
					disablePrevious : true,
					disableNext: false,
					noResult:data.response.result.length
				});
			})
			.catch(function(error){
				
			});	
		}else {

			decrement=decrement-1;
		    this.setState({pageNo : decrement, disableNext:false});
		   
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
				currentThis.setState({
					clubs:data.response.result,
					noResult:data.response.result.length
				});
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
					clubs:data.response.result,
					noResult:data.response.result.length
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
                    currentThis.setState({disableNext : true, disablePrevious : true});
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
				        noOfPages : Math.ceil(pages),
				        noResult : data.response.result.length
			        });
		        }else {
		    	    currentThis.setState({
				        result :true,
				        noResult: currentThis.state.clubs.length,
				        filterData:false
			        });
		        }
		    }) 		
		    .catch(function(error){
			    
		    })
	    }
	}
});
