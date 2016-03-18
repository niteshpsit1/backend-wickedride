var AllUrl = {
	pageSize: 5
}
 
var ClubList = React.createClass({
	getInitialState: function(){
		return ({
			club: {},
			clubMembers: false,
			clubMembersList:[],
			clubDelete: true,
			totalRides: false,
			clubRideList:[],
			showUser: false,
			showRide: false,
			showGallery: false,
			token: this.props.token,
			users:[],
			classUser : "users",
			classRide : "ride",
			classGallery : "gallery",
			date : {},
			time : {},
			memberCount : this.props.club.memberCount,
			showAlert : false,
			showtr : true,
			length : this.props.length,
			noUser : false

		});
	},
	componentWillMount: function(){
		
		var dd = new Date(this.props.club.date),
		date = (dd.getMonth() + 1) + '/' + dd.getDate() + '/' +  dd.getFullYear()
        var hours = dd.getHours();
        var minutes = dd.getMinutes();
        var time = hours + ':' + minutes;
               
		this.setState({
			club: this.props.club,
			token: this.props.token,
			date : date,
			time : time
		});
	},

	appendUser: function(){
		if(this.state.classRide=="ride active") {
            this.handleHideRide();
            this.setState({showUser:true, classUser : "users active"});
        }else {
        	this.setState({showUser:true, classUser : "users active"});
        }
	},

	appendRide: function(){
		if(this.state.classUser=="users active") {
			this.handleHideUser();
            this.setState({showRide:true, classRide : "ride active"});
        }else {
        	this.setState({showRide:true, classRide : "ride active"});
        }
	},

	handleHideUser: function() {
        this.setState({showUser:false, classUser : "users"});
	},

	handleHideRide: function() {
        this.setState({showRide:false, classRide : "ride"});
	},

	handleHideGallery: function() {
        this.setState({showGallery:false, classGallery : "gallery"});
	},

	memberLength: function(length) {
		var self = this;
        self.setState({memberCount : length});
	},

	removeUser: function() {
    	this.setState({showAlert: true, message : 'Are you sure you want to delete club?', action : "userDelete"});
    },

    removeUserApi: function() {
    	var self = this,
    	length = self.state.length;
    	var requestData = {
    		token : this.state.token,
    		clubID : this.props.club.clubId
    	};
    	
    	services.POST(config.url.deleteClub, requestData)
		.then(function(data){
			console.log("lengthhh b4",self.state.length);
			self.state.length--;
			self.props.filterLength(self.state.length);
			self.setState({showAlert : true, message : "Club has been deleted successfully.", action : "onlyOne"});
			console.log("lengthhh aft",self.state.length);
			self.setState({ showtr : false});
			
		})
		.catch(function(error){
			if(error.response.message) {
				self.setState({showAlert : true, message : error.response.message, action : "onlyOne"})
			}
		});	
    },


    handleHideAlertModal: function(value){
    	var self = this;
    	if(value=="userDelete") {
    		setTimeout(function () {
    			self.setState({showAlert: false});
    		},0);
    		setTimeout(function () {
    			self.removeUserApi();
    		},0) 
        	
        }else if(value=="deleteUser"){
        	this.setState({showAlert: false});
        } else if(value=="onlyOne"){
        	this.setState({showAlert: false});
        }
    },


	render: function () {
		var currentThis = this;
		var time = Date.parse(this.props.club.time);
		
		return (
			
			<tbody cellSpacing="0" cellPadding="25">
			{this.state.showtr &&
			    <tr>
			        <td><p>{this.props.club.clubName}</p></td>
				    <td><p>{this.props.club.creatorName}</p></td>
				    <td><p>{this.state.date}</p></td>
				    <td><p><a href="javascript:void(0)" onClick={this.appendUser} className={this.state.classUser}></a>{this.state.memberCount}</p>
				        <p><a href="javascript:void(0)" onClick={this.appendRide} className={this.state.classRide}></a>{this.props.club.rideCount}</p>
				    </td>
				    <td>
						<a href="javascript:void(0)" className="removeUser" onClick={this.removeUser}></a>
					</td>
				</tr>}

                {this.state.showAlert ? <AlertModal handleHideAlertModal={this.handleHideAlertModal} action={this.state.action} message={this.state.message}/> : null}
                <tr>
				    
				        {this.state.showUser ? <MembersListing handleHideUser={this.handleHideUser} token={this.props.token} clubID={this.props.club.clubId} admin={this.props.club.creatorId} memberLength={this.memberLength}/>:null}
				        {this.state.showRide ? <RidesListing handleHideRide={this.handleHideRide} token={this.props.token} clubID={this.props.club.clubId}/>:null}
				        {this.state.showGallery ? <MembersListing handleHideGallery={this.handleHideGallery}/>:null}
				   
				</tr>
				<tr>
					{this.state.noUser &&
						<td colSpan="5" className="no-Club">
							<div className="page-title">
								<span className="users"></span>
								<h4>No clubs available.</h4>
								
							</div>
						</td>

					}
				</tr>
			</tbody>
		);
	},
	_onClick: function(event){

		var currentThis = this;
		var data = {}
		data.id = $(event.target).attr("name")
		if($(event.target).attr("name") == "clubDelete"){
			if(confirm("club will detele permanently") == true) {
				this.setState({
					clubDelete: false
				})
			}
		}
		else if($(event.target).attr("name") == "clubMembers"){
			
			if(!this.state.clubMembers){
				var requestData = {}
				requestData.token = this.props.token;
				requestData.clubID = this.props.club.clubId; 
				services.POST(config.url.getClubMembers, requestData)
				.then(function(data){
					currentThis.setState({
						clubMembers: !currentThis.state.clubMembers,
						clubMembersList: data.response,
						totalRides:false
					});
				})
				.catch(function(error){
				});
			}
			else{
				this.setState({
					clubMembers: !this.state.clubMembers,
					totalRides:false
				});
			}
		}
		else if($(event.target).attr("name") == "totalRides"){
			
			if(!this.state.totalRides){
				var requestData = {}
				requestData.token = this.props.token;
				requestData.clubID = this.props.club.clubId; 
				services.POST(config.url.getClubRides, requestData)
				.then(function(data){
					currentThis.setState({
						clubMembers: false,
						totalRides: true,
						clubRideList:data.response.result
					})
				})
				.catch(function(error){
				});
			}
			else{
				this.setState({
					clubMembers: false,
					totalRides:false
				});
			}
		}
	}
});
