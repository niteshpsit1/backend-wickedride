
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
            ridesAvailable:false
			
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

	render: function () {
		var self = this;
		if(this.state.ridesAvailable==true) {
		return (
			<td colSpan="5" className="no-Club">
				<div className="page-title">
					<h4>Ride Listing</h4>
					<div className="filter-block" onClick={this.close}>
						<a href="#"></a>
					</div>
				</div>

				<div className="inner-table">
					<table cellSpacing="0"  cellPadding="25">
						<th>Ride Name</th>
						<th>Descrption</th>
						<th>Start Date</th>
						<th>Start Time</th>
						<th>Members</th>
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
	
});


