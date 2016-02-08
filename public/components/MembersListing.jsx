
var MembersListing = React.createClass({
	getInitialState: function(){
		return ({
			/*members:[
                {
	                userName : "club1",
	                designation : "deepak",
	                awards : "global",
	                clubJoined : "various"
                },{
	                userName : "club1",
	                designation : "deepak",
	                awards : "global",
	                clubJoined : "various"
                },{
	                userName : "club1",
	                designation : "deepak",
	                awards : "global",
	                clubJoined : "various"
                },{
	                userName : "club1",
	                designation : "deepak",
	                awards : "global",
	                clubJoined : "various"
                }
            ]*/
            members : [],
            membersAvailable: false

			
		});
	},
	componentWillMount: function(){
		console.log("MembersListinggggggggggg");
        
        var self= this,
        result = [];
		var requestData = {
			token: this.props.token,
			clubID: this.props.clubID
			//pageSize:config.pagination.pageSize,
			//createdOn: this.state.clubs.length ? this.state.clubs[allUrlData.pageSize-1].createdOn : null
		};
		services.GET(config.url.getClubMembers, requestData)
		.then(function(data){
			console.log("getClubMemberssssssssssss1111",data);
			result=data.response.result;
			if(result.length) {
				self.setState({
				members:data.response.result,
				membersAvailable:true
			});
			}
			


		
		console.log("getClubMemberssssssssssss22222",self.state.members);
			
		})
	    .catch(function(error){
			console.log("====catch",error);	
		});
        

        


	},

	close: function() {
		console.log("inside close function");
		this.props.handleHideUser(false);
       
	},

	componentDidMount: function() {

		console.log("diddd mount");

	},

	render: function () {
		var self=this;
		if(this.state.membersAvailable==true) {
		return (
			<td colSpan="5" className="no-Club">
			
				<div className="page-title">
				    <span className="users"></span>
					<h4>All Club Details</h4>
					<div className="filter-block" onClick={this.close}>
						<a href="#"></a>
					</div>
				</div>
				<div className="inner-table">
					<table cellSpacing="0"  cellPadding="25">
						<th>User Name</th>
						<th>Designation</th>
						<th>Awards</th>
						<th>ClubJoined</th>
						<th></th>
			
						<tbody>
						{this.state.members.map(function(member){
							console.log("&&&&&&&&&&&&&&",member);
								return <Member member={member} token={self.props.token} clubID={self.props.clubID}/>
							})}
						</tbody>
					</table>
				</div>
				
			</td>		
		)
	    }else {
	    	return(
		    <td colSpan="5" className="no-Club">
				<div className="page-title">
				<span className="users"></span>
					<h4>No club members available</h4>
					<div className="filter-block" onClick={this.close}>
						<a href="#"></a>
					</div>
				</div>
			</td>)
	    }
	}
	
});


