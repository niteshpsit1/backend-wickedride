var allUrlData = {
	pageSize: 5
}

var MembersListingModal = React.createClass({

	getInitialState : function(){
		return {
			clubs : [],
			noOfPages: null,
			pageNo : 1,
			disablePrevious : true,
			disableNext : false
		};
	},

	componentWillMount: function(){
        var self= this,
        pages = null,
		LOD = null,
        result = [];
		var requestData = {
			token: this.props.token,
			userID: this.props.userID,
			pageSize:5
		};
		services.GET(config.url.getClubMemberNameList, requestData)
		.then(function(data){
			LOD = data.response.lengthOfDocument;
			if((LOD<5&&LOD>0)||LOD==5){
                pages = 1;
                self.setState({disableNext:true,disablePrevious:true,showButton: false
                });
			}else if(LOD==0){
                self.setState({notAvailable : true});
			}else {

			    pages = LOD/allUrlData.pageSize;
		    }

			result=data.response.result;
			if(result.length) {
				self.setState({
				clubs:data.response.result,
				noOfPages : Math.ceil(pages)
			});
			}
			
			
		})
	    .catch(function(error){
		});
    },
    
	componentDidMount: function() {

		$(React.findDOMNode(this)).modal('show');
		$(React.findDOMNode(this)).on('hidden.bs.modal', this.props.handleHideModal);
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
				token: this.props.token,
				userID: this.props.userID,
			    pageSize:5,
			    pageNumber: this.state.pageNo-1
			};
			services.GET(config.url.getClubMemberNameList, requestData)
			.then(function(data){
				currentThis.setState({clubs:data.response.result, disablePrevious : true, disableNext: false});
			})
			.catch(function(error){
			});	
		}else {
			decrement=decrement-1;
		    this.setState({pageNo : decrement});
		    var requestData = {
				token: this.props.token,
				userID: this.props.userID,
			    pageSize:5,
			    pageNumber: this.state.pageNo-1
			};
			services.GET(config.url.getClubMemberNameList, requestData)
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
		this.setState({disablePrevious: false});
		
        increment = increment+1;
		if(increment==this.state.noOfPages){
			this.setState({disableNext : true})
		}
			
		this.setState({pageNo : increment}); 
		
		var requestData = {
		    token: this.props.token,
		    userID: this.props.userID,
			pageSize:5,
			pageNumber: this.state.pageNo+1
		};
		services.GET(config.url.getClubMemberNameList, requestData)
		.then(function(data){
			
			currentThis.setState({
			clubs:data.response.result
		});
			
		})
		.catch(function(error){
		});	
		
		
	},

	render: function () {
		
		

		return (

			<div id="myModal" className="modal fade" role="dialog">
			    <div className="modal-dialog">
			        <div className="modal-content">
			            <div className="modal-header">
			                
			                <div className="page-title">
			                
				                <h1>Clubs</h1>
				                <div className="filter-block" data-dismiss="modal">
					                <a href="javascript:void(0)"></a>
				                 </div>
			                </div>

			            </div>
			            <div className="modal-body">
			                <table cellSpacing="0"  className="club-details">
						        <th>Club Name</th>
						        <th>Joined As</th>
						        <tbody>
						            {this.state.clubs.map(function(club,i){
								        return( 
								            <tr key={i}>
				                                <td><p>{club.clubName}</p></td>
				                                <td><p>{club.joinedAs}</p></td>
				                            </tr>
				                        )
							        })}
						        </tbody>
					        </table>
					        <div className="text-right arrow-sign">
					            <button type="button" className="btn prevBtn" onClick={this._onPaginationPrevious} name="previous" disabled={this.state.disablePrevious}>Previous</button>&nbsp; 
					            <button type="button" className="btn nextBtn" onClick={this._onPaginationNext} name="next" disabled={this.state.disableNext}>Next</button>
                            </div>
					    </div>
			        </div>
			    </div>
			</div>
		)
    }

});



