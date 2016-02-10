
var RidesListing = React.createClass({
	getInitialState: function(){
		return ({
			/*rides:[
                {
	                rideName : "Ride1",
	                description : "My First Ride",
	                date : "05/01/2016",
	                time : "various",
	                member : "5"
                },{
	                rideName : "Ride1",
	                description : "My First Ride",
	                date : "05/01/2016",
	                time : "various",
	                member : "5"
                },{
	                rideName : "Ride1",
	                description : "My First Ride",
	                date : "05/01/2016",
	                time : "various",
	                member : "5"
                },{
	                rideName : "Ride1",
	                description : "My First Ride",
	                date : "05/01/2016",
	                time : "various",
	                member : "5"
                }
            ],*/
            rides:[],
            ridesAvailable:false,
            filter: false,
            filterByStartDate:"",
            filterByEndDate: ""

			
		});
	},
	componentWillMount: function(){
		console.log('RidesListinggggggg');
    
        var self= this;
        /*var current = this;*/
        var result = [];
		var requestData = {
			token: self.props.token,
			clubID: self.props.clubID
		};

		services.GET(config.url.getClubRides, requestData)
		.then(function(data){
			console.log("gridessssss1111",data);
			result=data.response.result;
			console.log("gridessssss2222",result);
			if(result.length) {
				console.log("333333333333333333",self);
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

	close: function() {
		console.log("inside close function");
		this.props.handleHideRide(false);
       
	},

	componentDidMount: function() {

		console.log("diddd mount");

	},

	rideFilter: function(){
		console.log("oooooooooooo");
		this.setState({
			filter: !this.state.filter
		});
	},

	_onchange: function(event){
		
		if(event.target.name == "filterByStartDate"){

			this.setState({
				filterByStartDate: event.target.value
			});
			console.log("starttttttttt",this.state.filterByStartDate);
			
		}
		else if(event.target.name == "filterByEndDate"){
			this.setState({
				filterByEndDate: event.target.value
			});
			console.log("starttttttttt",this.state.filterByEndtDate);
		}
		
	},

	render: function () {
		var self = this;
		if(this.state.ridesAvailable==true) {
		return (
			<td colSpan="5" className="no-Club">
				<div className="page-title">
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
								    <td><input type="text" name="filterByStartDate" onChange={this._onchange} id="#datetimepicker1"/>
								        <span className="input-group-addon">
                                            <span className="glyphicon glyphicon-calendar"></span>
                                        </span>
                                    </td>
								    <td style={{width:'100px'}}><label>End Date</label></td>
								    <td><input type="text" name="filterByEndDate" onChange={this._onchange} id="#datetimepicker2"/>
								        <span className="input-group-addon">
                                            <span className="glyphicon glyphicon-calendar"></span>
                                        </span>
                                    </td>
	    
							    </tr>
							    
							    <tr>
								    <td colSpan="4">
									    <div className="button-block">
										    <button onClick={this._onFilterClick}>Filter</button>
									    </div>
								    </td>
							    </tr>
						    </tbody>
					    </table>
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
					    <h4>No rides are available</h4>
					    <div className="filter-block" onClick={this.close}>
						    <a href="#"></a>
					    </div>
				    </div>
				</td>

				)
		}
	},

	_onFilterClick: function(){
		console.log("sssssddddddd",this.state.filterByStartDate);
		console.log("eeeeeeeddddddd",this.state.filterByStartDate);
		var self= this;
        var result = [];
		var requestData = {
			token: self.props.token,
			clubID: self.props.clubID,
			startDate: self.state.filterByStartDate,
			endDate: self.state.filterByEndDate
		};

		services.GET(config.url.getClubRides, requestData)
		.then(function(data){
			console.log("gridessssss1111",data);
			result=data.response.result;
			console.log("gridessssss2222",result);
			if(result.length) {
				console.log("333333333333333333",self);
				self.setState({
				rides:result
			});
			}

			
		})
	    .catch(function(error){
			console.log("====catch",error);	
		});
	}
	
});


