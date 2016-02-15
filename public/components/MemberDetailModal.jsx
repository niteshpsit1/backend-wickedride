var MemberDetailModal = React.createClass({

	getInitialState : function(){
		return {
			detail : []
		};
	},

	componentWillMount: function(){
		
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
		
		return (


			<div id="myModal" className="modal fade" role="dialog">
			    <div className="modal-dialog">
			        <div>
			            <div>
			                
			                <div className="page-title">
			                <span className="ride"></span>
				                <h1>Clubs</h1>
				                <div className="filter-block" data-dismiss="modal">
					                <a href="#"></a>
				                 </div>
			                </div>

			            </div>
			            <div className="modal-body">
			                <table cellSpacing="0"  className="club-details">
			                    <tr>
			                        <th className="text-center">User Name</th>
						            <th className="text-center">Club Name</th>
						            <th className="text-center">Joined As</th>
						        </tr>

						        <tbody>
						             
								    <tr>
								        <td className="user-image"><img src="https://s3-ap-northeast-1.amazonaws.com/bikersclub/ride_new/EDDD8374-2B4F-4137-B941-9BEDD2CB5B63.jpg"/></td>
								        <td colSpan="2" className="detail-modal-td">
								            <div className="detail-modal">
								                <table>
								                {this.state.detail.map(function(club){
						            	            
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