var LiMembers = React.createClass({
	getInitialState: function(){
		return ({
			
			showMember: true
			
		});
	},

	transferRights: function() {
        console.log("rights9999999999999999999999999999",this.props.oldAdminID,"ttt",this.props.token,"new",this.props.newAdminID);
        var self= this,
        result = [];
		var requestData = {
			token: this.props.token,
			oldAdminID : this.props.oldAdminID,
			newAdminID : this.props.newAdminID,
			clubID: this.props.clubID

			//pageSize:config.pagination.pageSize,
			//createdOn: this.state.clubs.length ? this.state.clubs[allUrlData.pageSize-1].createdOn : null
		};
		services.POST(config.url.makeNewAdmin, requestData)
		.then(function(data){
			
			console.log("hurreyyyyyyyyyy",data.response);
			if(result) {
				self.setState({
				transferred:true
				
			});
			}
			
			
		})
	    .catch(function(error){
			console.log("====catch",error);	
		});
        
	},

	
	
	render: function () {
	        var self= this;
		    return (
		    	<li onClick={this.transferRights}>{this.props.name}</li>
			)
	}
});
