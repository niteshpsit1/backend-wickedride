var LiMembers = React.createClass({
	getInitialState: function(){
		return ({
			
			showMember: true,
			showAlert : false,
			alertMessage : "Are you sure you want to delete the club?",
			action : "changeAdmin"
			
		});
	},
    
    componentWillMount: function() {
       /* console.log("ooooooooooo");*/
    },

	changeAdminApi: function() {
        console.log("changeAdminApi");
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
			
			console.log("Rights transferred successfully",data.response);
			if(result) {
				self.setState({transferred:true});
				self.props.rightsMessage(true,self.props.name);
				/*self.props.handleHideAlertModal();*/
			}
			
			
		})
	    .catch(function(error){
			console.log("====catch",error);	
		});
        
	},

	handleShowAlertModal: function() {
		console.log("newadminnn iddddddd",this.props.newAdminID)
		this.props.handleShowAlertModal(this.state.action,this.props.newAdminID);
		/*
		*/

    },
	
	render: function() {
		    console.log("liiiiiiiiiiiiiii");
	        var self= this;
		    return (
		    	<div>
		    	    <li onClick={this.handleShowAlertModal}><a href="#">{this.props.name}</a></li>
		    	    {this.state.showAlert ? <AlertModal handleHideAlertModal={this.handleHideAlertModal} action={this.props.action} message={this.props.message}/> : null}
		    	</div>
			)
	}
});
