var allUrlData = {
	pageSize: 10
}
var Notification = React.createClass({
	getInitialState: function(){
		return {
			token: localStorage.getItem("wikedrideSuperAdminIsLogin") ? JSON.parse(localStorage.getItem("wikedrideSuperAdminIsLogin")).token : "",
			requests : [],
			show : true
			
		}
	},
	componentWillMount: function () {
		
		var self = this;
		var requestData = {
			token: self.state.token
			
		};
		services.POST(config.url.getDeleteRequests, requestData)
		.then(function(data){
			
			
			self.setState({requests : data.response.result});
		})
		.catch(function(error){
			console.log("====catch",error);	
		});	
	},

	deleteClub: function() {
        console.log("yeahh");
	},

	render: function (){
		var currentThis = this;
		
		
		return (
		
			<div className="main user-mgt-page-filtered common-table expandable">
				<div className="main-content">
				    <div className="page-title">
					    <h1>Notifications for Delete Requests from Admins</h1>
				    </div>
				
				    <div className="content home-page">
				        {this.state.requests.map(function(request,i) {
                            
                            return <Notify request={request} key={i} token={currentThis.state.token} tag={request._id}/>
					    })}
					    
			        </div>
		        </div>
		    </div>
		)
	}
	});/*,
	_onFilter: function(){
		this.setState({
			clubFilter: !this.state.clubFilter
		});
	},

	_onchange: function(event){
		
		if(event.target.name == "filterByDesignation"){
			this.setState({
				filterByDesignation: event.target.value
			});
		}
		else if(event.target.name == "filterByClubName"){
			this.setState({
				filterByClubName: event.target.value
			});
		}
		else if( event.target.name == "filterByCreatorName"){
			this.setState({
				filterByCreatorName: event.target.value
			});
		}
	},

	_onPaginationPrevious: function(event){
		if(this.state.pageNo==this.state.noOfPages) {
			this.setState({disableNext : false})
		}
		
		var decrement = this.state.pageNo;
		console.log("previosssssssssssss",decrement,this.state.noOfPages);
		var minus = null;
		
		if(decrement==0){
			this.setState({disablePrevious : true})
		}else {
		    minus = decrement-1;
		    console.log("decrementttttttttt",decrement);
		    this.setState({pageNo : minus});
		    console.log("+++++++++",decrement);
		    var currentThis = this;
		
			var requestData = {
				token: this.state.token,
			    pageSize:allUrlData.pageSize,
			    pageNumber: this.state.pageNo
			};
			services.POST(config.url.getAllClub, requestData)
			.then(function(data){
				currentThis.setState({
					clubs:data.response.result
				});
			})
			.catch(function(error){
				console.log("====catch",error);	
			});	
		}
	},

	_onPaginationNext: function(event){
		var increment = this.state.pageNo;
		this.setState({disablePrevious: false});
		
    console.log("npoooooooooooooooooo",this.state.noOfPages,this.state.pageNo);
		if(increment==Math.ceil(this.state.noOfPages)){
			this.setState({disableNext : true})
		}else {
			increment = increment+1;
		this.setState({pageNo : increment});
		console.log("+++++++++",increment);
		var currentThis = this;
		
			var requestData = {
		        token: this.state.token,
			    pageSize:allUrlData.pageSize,
			    pageNumber: this.state.pageNo
			};
			services.POST(config.url.getAllClub, requestData)
			.then(function(data){
				console.log("~~~~~~~~~~~~~~~~~~~~~",data.response.result);
				currentThis.setState({
					clubs:data.response.result
				});
			})
			.catch(function(error){
				console.log("====catch",error);	
			});	
		}
		
	},

	_onFilterClick: function(){
		var currentThis = this;
		var requestData = {};
		requestData.token = this.state.token;
		requestData.name = this.state.filterByName;
		requestData.email = this.state.filterByEmail;
		requestData.designation = this.state.filterByDesignation;
		services.POST(config.url.clubListFilter, requestData)
		.then(function(data){
			currentThis.setState({
				clubs:data.response.result
			});
		}) 		
		.catch(function(error){
			console.log(error)
		})
	}*/
/*});*/

/*clubs.length ? this.state.clubs[allUrlData.pageSize-1].createdOn : null*/