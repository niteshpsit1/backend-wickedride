var allUrlData = {
	pageSize: 10
}
var Notification = React.createClass({
	getInitialState: function(){
		return {
			token: localStorage.getItem("wikedrideSuperAdminIsLogin") ? JSON.parse(localStorage.getItem("wikedrideSuperAdminIsLogin")).token : "",
			requests : [],
			show : true,
			noOfPages: null,
			pageNo : 1,
			disablePrevious : true,
			disableNext : false,
			notAvailable : false
		}
	},
	componentWillMount: function () {
		
		var self = this,
		pages = null,
		LOD = null;
		var requestData = {
			token: self.state.token
			
		};
		services.POST(config.url.getDeleteRequests, requestData)
		.then(function(data){
			LOD = data.response.lengthOfDocument;
			if((LOD>0&&LOD<10)||LOD==10){
                pages = 1;
                self.setState({disablePrevious : true,disableNext : true});
			}else if(LOD==0){
				
			    self.setState({notAvailable : true});
		    }else {
			    pages = LOD/allUrlData.pageSize;
		    }
			
			self.setState({requests : data.response.result,noOfPages : Math.ceil(pages)});
		})
		.catch(function(error){
			console.log("====catch",error);	
		});	
	},

	render: function (){
		var currentThis = this;
		
		if(this.state.notAvailable){
			
		return (
		
			<div className="main user-mgt-page-filtered common-table expandable">
				<div className="main-content">
				    <div className="page-title">
					    <h1>Notifications for Delete Requests from Admins</h1>
				    </div>
				    
				    <div className="content home-page">
				        <div><b>No Notifications present</b></div>
			        </div>
		        </div>
		    </div>
		)
	} else {
		
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
			        <div className="text-right">
					    <button type="button" className="btn btn-success" onClick={this._onPaginationPrevious} name="previous" disabled={this.state.disablePrevious}>Previous</button>&nbsp; 
					    <button type="button" className="btn btn-success" onClick={this._onPaginationNext} name="next" disabled={this.state.disableNext}>Next</button>
                        
					</div>
		        </div>
		    </div>
		)
	    }
    },

	_onPaginationPrevious: function(event){
		var currentThis = this;
		if(this.state.pageNo==this.state.noOfPages) {
			this.setState({disableNext : false})
		}
		
		var decrement = this.state.pageNo;
		var minus = null;
		
		if(decrement==1){
			this.setState({disablePrevious : true, disableNext:false})
		}else if(decrement==2){
		   
		    decrement=decrement-1;
		    this.setState({pageNo : decrement});
		    
			var requestData = {
				token: this.state.token,
			    pageSize:allUrlData.pageSize,
			    pageNumber: this.state.pageNo-1
			};
			services.GET(config.url.getDeleteRequests, requestData)
			.then(function(data){
				currentThis.setState({requests : data.response.result, disablePrevious : true, disableNext: false});
			})
			.catch(function(error){
				console.log("====catch",error);	
			});	
		}else {
			decrement=decrement-1;
		    this.setState({pageNo : decrement});
		    
			var requestData = {
				token: this.state.token,
			    pageSize:allUrlData.pageSize,
			    pageNumber: this.state.pageNo-1
			};
			services.GET(config.url.getDeleteRequests, requestData)
			.then(function(data){
				currentThis.setState({requests : data.response.result});
			})
			.catch(function(error){
				console.log("====catch",error);	
			});
		}
	},

	_onPaginationNext: function(event){
		var currentThis = this;
		var increment = this.state.pageNo;
		this.setState({disablePrevious: false});
		
        increment = increment+1;

		if(increment==this.state.noOfPages){
			this.setState({disableNext : true})
		}
			
		    this.setState({pageNo : increment});

			var requestData = {
		        token: this.state.token,
			    pageSize:allUrlData.pageSize,
			    pageNumber: this.state.pageNo+1
			};
			services.GET(config.url.getDeleteRequests, requestData)
			.then(function(data){
				
				currentThis.setState({requests : data.response.result});
				
			})
			.catch(function(error){
				console.log("====catch",error);	
			});	
		
		
	}
	});