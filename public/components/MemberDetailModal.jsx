var MemberDetailModal = React.createClass({

	getInitialState : function(){
		return {
			detail : []
		};
	},

	componentWillMount: function(){
		console.log("JJJJJJJJJJJJJJJ");
        var self= this,
        result = [];
        var image = {};
		var requestData = {
			token: this.props.token,
			userID: this.props.userID
			//pageSize:config.pagination.pageSize,
			//createdOn: this.state.clubs.length ? this.state.clubs[allUrlData.pageSize-1].createdOn : null
		};
		services.GET(config.url.getMemberDetail, requestData)
		.then(function(data){
			image = data.response.result[0];
			result=data.response.result[0].club;
			console.log("lllllllllllll",image);
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
			        <div>
			            <div>
			                
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
			                    <tr>
			                        <th>User Name</th>
						            <th>Club Name</th>
						            <th>Joined As</th>
						        </tr>

						        <tbody>
						             
								    <tr>
								        <td><img src={this.props.userImage}/></td>
								        <td colSpan="2" className="detail-modal-td">
								            <div className="detail-modal">
								                <table>
								                {this.state.detail.map(function(club){
						            	            console.log("detailssssssssss",club);
								                    return(
                                                    
                                                        <tr key={club.clubID}>
                                                            <td><p>{club.clubName}</p></td>
				                                            <td><p>{club.designation}</p></td>
				                                        </tr>
                                                    
                                                    )
							                    })}
							                    </table>
                                            </div>
								        </td>
				                    </tr>
				                        
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