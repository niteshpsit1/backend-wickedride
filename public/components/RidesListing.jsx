var RidesListing = React.createClass({
	getInitialState: function(){
		return ({
			
            rides:[],
            ridesAvailable:false,
            filter: false,
            filterByStartDate:"",
            filterByEndDate: "",
            showAlert: false,
            action : "emptyFields",
            message: "Please Fill up the fields."

			
		});
	},
	componentWillMount: function(){
    
        var self= this;
        var current = this;
        var result = [];
		var requestData = {
			token: self.props.token,
			clubID: self.props.clubID
		};

		services.GET(config.url.getClubRides, requestData)
		.then(function(data){
			
			result=data.response.result;
			
			if(result.length) {
				
				self.setState({
				rides:result,
				ridesAvailable:true
			});
			}
        })
	    .catch(function(error){
			console.log("====catch",error);	
		});
    },

    componentDidUpdate: function(){    	
		$("#datetimepicker1").datepicker({
            showOn: "button",
            buttonText: "Show Date",
            buttonImageOnly: true,
            buttonImage: "http://jqueryui.com/resources/demos/datepicker/images/calendar.gif",
            dateFormat: 'yy-mm-dd'
        });  

		$("#datetimepicker2").datepicker({
            showOn: "button",
            buttonText: "Show Date",
            buttonImageOnly: true,
            buttonImage: "http://jqueryui.com/resources/demos/datepicker/images/calendar.gif",
            dateFormat: 'yy-mm-dd'
        });	
    },

	close: function() {
		
		this.props.handleHideRide(false);
       
	},

	rideFilter: function(){
		
		this.setState({
			filter: !this.state.filter
		});
	},

	_onchange: function(event){

		$( "#datetimepicker1" ).datepicker();
		$( "#datetimepicker2" ).datepicker();
		
		if(event.target.name == "filterByStartDate"){

			this.setState({
				filterByStartDate: event.target.value
			});
			
			
		}
		else if(event.target.name == "filterByEndDate"){
			this.setState({
				filterByEndDate: event.target.value
			});
			
		}
		
	},

	handleHideAlertModal: function(value){
		
        this.setState({showAlert: false});
        /*if(value==="emptyFields") {
            this.changeAdminApi();
        }*/
    },

	render: function () {
		var self = this;
		if(this.state.ridesAvailable==true) {
		return (
			<td colSpan="5" className="no-Club">
				<div className="page-title">
				<span className="ride-listing"></span>
					<h4>Ride Listing</h4>
					<div className="ride" onClick={this.rideFilter}>
						<a href="#"></a>
					</div>
					<div className="filter-block" onClick={this.close}>
						<a href="#"></a>
					</div>
				</div>
                <div className="content">
				    {this.state.filter &&
				    <div className="filter-form">
					    <table>
						    <tbody>
							    <tr>
								    <td style={{width:'100px'}}><label>Start Date</label></td>
								    <td>
								        <input type="text" name="filterByStartDate" onChange={this._onchange} id="datetimepicker1" className="rideFilter-input"/>
                                    </td>
								    <td style={{width:'100px'}}><label>End Date</label></td>
								    <td>
								        <input type="text" name="filterByEndDate" onChange={this._onchange} id="datetimepicker2" className="rideFilter-input"/>
                                    </td>
							    </tr>
							    
							    <tr>
								    <td colSpan="4">
									    <div className="button-block" onClick={this._onFilterClick}>
									        <button>Search</button>
									    </div>
								    </td>
							    </tr>
						    </tbody>
					    </table>
					    {this.state.showAlert ? <AlertModal handleHideAlertModal={this.handleHideAlertModal} action={this.state.action} message={this.state.message}/> : null}

			        </div>}
			    </div>

				<div className="inner-table">
					<table cellSpacing="0"  cellPadding="25">
					    <tr>
						    <th>Ride Name</th>
						    <th>Descrption</th>
						    <th>Start Date</th>
						    <th>Start Time</th>
						    <th>Members</th>
						</tr>
						<tbody>
						    {this.state.rides.map(function(ride){
								return <Ride ride={ride} token={self.props.token} key={ride.rideID}/>
							})}
						</tbody>
					</table>
				</div>
			</td>			
		)}
		else {
			return(
				<td colSpan="5" className="no-Club">
				    <div className="page-title">
				    <span className="ride-listing"></span>
					    <h4 className="no-rides">No rides are available</h4>
					    <div className="filter-block" onClick={this.close}>
						    <a href="#"></a>
					    </div>
				    </div>
				</td>

				)
		}
	},

	_onFilterClick: function(){
		var sd = $('#datetimepicker1').val();
		var ed = $('#datetimepicker2').val();
		
		var d1 = new Date(sd);
        var d2 = new Date(ed);
        var D1 = parseInt(d1.getTime());
        var D2 = parseInt(d2.getTime());
		if((sd==""||sd==null)||(ed==""||ed==null)){
            this.setState({showAlert: true});

		}else if(D1>D2){
            this.setState({showAlert: true, message: "Start date should be greater than End date."});
		}else {
		    var self= this;
            var result = [];
		    var requestData = {
			    token: self.props.token,
			    clubID: self.props.clubID,
			    startDate: sd,
			    endDate: ed
		    };

		    services.GET(config.url.getClubRides, requestData)
		    .then(function(data){
			    
			    result=data.response.result;
			    if(result.length) {
			    	self.setState({rides:result});
			    }else {
			    	self.setState({showAlert:true, message: "No results found."});
			    }
			})
	        .catch(function(error){
			    console.log("====catch",error);	
		    });
	    }
	}
	
});

