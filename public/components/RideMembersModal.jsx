var RideMembersModal = React.createClass({

	getInitialState : function(){
		return {
			members : []
		};
	},

	componentWillMount: function() {
		var self= this,
        result = [];
		var requestData = {
			token: this.props.token,
			rideID: this.props.rideID
			//pageSize:config.pagination.pageSize,
			//createdOn: this.state.clubs.length ? this.state.clubs[allUrlData.pageSize-1].createdOn : null
		};
		services.GET(config.url.getClubRideMembers, requestData)
		.then(function(data){
			console.log("Ridememberslistinggggg",data);
			result=data.response.result;
			if(result.length) {
				self.setState({
				members:data.response.result,
				membersAvailable:true
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

        console.log("modalllll");
	},

	

	render: function () {
		var self = this;
		return (

			<div id="myModal" className="modal fade" role="dialog">
			    <div className="modal-dialog">
			        
			            <div className="page-title">
			                <span className="users"></span>
				            <h4>Ride Members Listing</h4>
				            <div className="filter-block" data-dismiss="modal">
					            <a href="#"></a>
				            </div>
			            </div>
			        

			        <div className="modal-body">
				        
					        <table cellSpacing="0"  className="club-details">
						        <th>Member Name</th>
						        <th>Designation</th>
						        <th>Number of clubs</th>
						        <tbody>
						        {this.state.members.map(function(member){
								        return( <tr>
				                                    <td><p>{member.memberName}</p></td>
				                                    <td><p>{member.designation}</p></td>
				                                    <td><p>{member.noOfClubJoined}</p></td>
			                                    </tr>)
							        })}
						        </tbody>
					        </table>
				        
			        </div>
			    </div>
			</div>
			
		)
    }

});

/*var Member1 = React.createClass({
	getInitialState : function(){
		return {
			member : this.props.member
		};
	},

	render: function () {
		
		return (
			
			
			
		)
	}

});

*/