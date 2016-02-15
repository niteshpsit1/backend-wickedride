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
			filterByClubName : null,
			notAvailable : false,
			result : true,
			noResult : false,
			filterResult : [],
			filterData : false,
			showButton : true,
			action : "emptyFilterInput",
			message : "Fill up the fields first."
			

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
			console.log("====catch",error);	
		});	
	},
    
    handleHideAlertModal: function(value){
		
        this.setState({showAlert: false});
        
    },

	render: function (){
		var currentThis = this;
		
		if(this.state.notAvailable){
			
		    return (
		    
			    <div className="main user-mgt-page common-table">
				    <div className="main-content">
				        <div className="page-title">
					        <h1>All Club Details</h1>
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
					        <h1>All Club Details</h1>
					        <div className="filter-block">
						        <a href="#" onClick={this._onFilter}></a>
					        </div>
				        </div>
				    <div className="content">
				        {this.state.clubFilter &&
							    <div className="filter-form">
							    <form onSubmit={this._onFilterClick}>
								    <table>
									    <tbody>
										    <tr>
											    <td style={{width:'100px'}}><label>Club Name</label></td>
											    <td><input type="text" name="filterByClubName" onChange={this._onchange}/></td>
											    
										    </tr>
										    
										    <tr>
											    <td colSpan="4">
												    <div className="button-block">
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
						        <table cellSpacing="0" cellPadding="25">
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
								    <table>
									    <tbody>
										    <tr>
											    <td style={{width:'100px'}}><label>No result available</label></td>
											    
											    
										    </tr>
									    </tbody>
								    </table>
						    </div>}
				    </div>
			    </div>
		    </div>
		    )
        }
	},
	_onFilter: function(){
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
		   
			var requestData = {
				token: this.state.token,
			    pageSize:allUrlData.pageSize,
			    pageNumber: this.state.pageNo-1
			};
			services.POST(config.url.getAllClub, requestData)
			.then(function(data){
				currentThis.setState({clubs:data.response.result, disablePrevious : true, disableNext: false});
			})
			.catch(function(error){
				console.log("====catch",error);	
			});	
		}else {
			decrement=decrement-1;
		    this.setState({pageNo : decrement});
		   
			var requestData = {
				token: this.state.token,
			    pageSize:allUrlData.pageSize,
			    pageNumber: this.state.pageNo-1
			};
			services.POST(config.url.getAllClub, requestData)
			.then(function(data){
				currentThis.setState({clubs:data.response.result});
			})
			.catch(function(error){
				console.log("====catch",error);	
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
				
			})
			.catch(function(error){
				console.log("====catch",error);	
			});	
		
		
	},

	_onFilterClick: function(event){
        event.preventDefault();
		var input1 = $("#filterByName").val();
		var input2 = $("#filterByEmail").val();
		if((input1==null||input1=="")&&(input2==null||input2=="")) {
            this.setState({showAlert: true});
		}else {
		    var currentThis = this;
		    var requestData = {
			    token : this.state.token,
			    clubName : this.state.filterByClubName
		    };
		    
		    services.POST(config.url.getAllClub, requestData)
		    .then(function(data){
			    if(data.response.result.length){
			        currentThis.setState({
				        filterResult:data.response.result,
				        filterData : true,
				        result : false
			        });
		        }else {
		    	    currentThis.setState({
				        noResult : true,
				        result :false
			        });
		        }
		    }) 		
		    .catch(function(error){
			    console.log(error)
		    })
	    }
	}
});
