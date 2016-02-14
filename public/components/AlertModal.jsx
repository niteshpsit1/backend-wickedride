var AlertModal = React.createClass({
	getInitialState : function() {
        return{
        	action : this.props.action
        }
	},

	componentDidMount: function() {

		$(React.findDOMNode(this)).modal('show');
		$(React.findDOMNode(this)).on('hidden.bs.modal', this.props.handleHideAlertModal);

	},

	confirm : function() {

        this.props.handleHideAlertModal(this.state.action);
	},

	cancel : function() {

        this.props.handleHideAlertModal("cancelled");
	},

	render: function () {
		return (

			<div id="myModal" className="modal fade" role="dialog">
			    <div className="modal-dialog">
			        
			        <div className="page-title">
			            
			            
						
				        <div className="filter-block" data-dismiss="modal">
				            <a href="#"></a>
				        </div>
				    </div>
				   
			        <div className="modal-body">
			            <h3>{this.props.message}</h3>
			            <button type="button" className="btn btn-success" onClick={this.confirm} data-dismiss="modal">confirm</button>&nbsp; 
					    <button type="button" className="btn btn-success" onClick={this.cancel} data-dismiss="modal">cancel</button>
			        </div>
			    </div>
			</div>
		
		)
    }

});


