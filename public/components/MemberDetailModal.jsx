var MemberDetailModal = React.createClass({

	getInitialState : function(){
		return {
			detail : []
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
		services.GET(config.url.getMemberDetail, requestData)
		.then(function(data){
			console.log("getClubMemberssssssssssss*********",data);
			result=data.response.result[0].club;
			console.log("resultttttttttttttttt",result);
			if(result.length) {
				self.setState({
				detail:result
				
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
		
		var arr = this.state.detail;
		/*console.log("@@@@@@@@@@@",arr);
		console.log("@@@@@@@@@@@222",arr[0]);
		var clubs = arr[0];*/
		/*console.log("@@@@@@@@@@@333",arr[0].club);*/

		return (

			<div id="myModal" className="modal fade" role="dialog">
			    <div className="modal-dialog">
			        <div className="modal-content">
			            <div className="modal-header">
			                
			                <div className="page-title">
			                <span className="ride"></span>
				                <h1>Clubs Listing</h1>
				                <div className="filter-block" data-dismiss="modal">
					                <a href="#"></a>
				                 </div>
			                </div>

			            </div>
			            <div className="modal-body">
			                <table cellSpacing="0"  className="club-details">
			                    <th></th>
						        <th>Club Name</th>
						        <th>Joined As</th>

						        <tbody>
						            {this.state.detail.map(function(club){
						            	console.log("detailssssssssss",club);
								            return( 
								                <tr>
								                    <td></td>
				                                    <td><p>{club.clubName}</p></td>
				                                    <td><p>{club.designation}</p></td>
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



3