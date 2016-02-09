var RideDescriptionModal = React.createClass({

	getInitialState : function(){
		return {
			name : null
		};
	},
    
	componentDidMount: function() {

		$(React.findDOMNode(this)).modal('show');
		$(React.findDOMNode(this)).on('hidden.bs.modal', this.props.handleHideRideDescriptionModal);

        console.log("modalllll");
	},

	

	render: function () {
		
		return (

			<div id="myModal" className="modal fade" role="dialog">
			    <div className="modal-dialog">
			        
			        <div className="page-title">
			            <span className="ride"></span>
			            
						<h4>{this.props.rideName}</h4>
				        <div className="filter-block" data-dismiss="modal">
				            <a href="#"></a>
				        </div>
				    </div>
				   
			        <div className="modal-body">
			            <table cellSpacing="0" className="modal-Description">
			                <tr>
			                    <th width="30%">Description</th>
						        <th className="text-right"><p><span className="time"></span> {this.props.time}</p></th>
						        <th className="text-right"><p><span className="date"></span> 20th november 2015</p></th>
						    </tr>
						    <tr rowSpan="5"><td colSpan="3">{this.props.description}</td></tr>
					    </table>
			        </div>
			    </div>
			</div>
		
		)
    }

});


