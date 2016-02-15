var MembersListingModal = React.createClass({

	getInitialState : function(){
		return {
			clubs : []
		};
	},

	componentWillMount: function(){
        var self= this,
        result = [];
		var requestData = {
			token: this.props.token,
			userID: this.props.userID
			//pageSize:config.pagination.pageSize,
			//createdOn: this.state.clubs.length ? this.state.clubs[allUrlData.pageSize-1].createdOn : null
		};
		services.GET(config.url.getClubMemberNameList, requestData)
		.then(function(data){
			result=data.response.result;
			if(result.length) {
				self.setState({
				clubs:data.response.result,
				/*clubsAvailable:true*/
			});
			}
			
			
		})
	    .catch(function(error){
			console.log("====catch",error);	
		});
    },
    
	componentDidMount: function() {

		$(React.findDOMNode(this)).modal('show');
		$(React.findDOMNode(this)).on('hidden.bs.modal', this.props.handleHideModal);
	},

	

	render: function () {

		return (

			<div id="myModal" className="modal fade" role="dialog">
			    <div className="modal-dialog">
			        <div className="modal-content">
			            <div className="modal-header">
			                
			                <div className="page-title">
			                
				                <h1>Clubs Listing</h1>
				                <div className="filter-block" data-dismiss="modal">
					                <a href="#"></a>
				                 </div>
			                </div>

			            </div>
			            <div className="modal-body">
			                <table cellSpacing="0"  className="club-details">
						        <th>Club Name</th>
						        <th>Joined As</th>
						        <tbody>
						            {this.state.clubs.map(function(club){
								            return( 
								                <tr>
				                                    <td><p>{club.clubName}</p></td>
				                                    <td><p>{club.joinedAs}</p></td>
				                                </tr>
				                            )
							        })}
						        </tbody>
					        </table>
					    </div>
			        </div>
			    </div>
			</div>
		)
    }

});



