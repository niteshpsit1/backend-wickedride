var TermAndConditions = React.createClass({
	getInitialState: function (){
		return {
			token: localStorage.getItem("wikedrideSuperAdminIsLogin") ? JSON.parse(localStorage.getItem("wikedrideSuperAdminIsLogin")).token : "",

			termAndConditionMessage:"ram",
			edit:false
		}
	},
	componentWillMount: function () {
		var currentThis = this;
		var requestData = {
			token: this.state.token
		};
		services.POST(config.url.getTermAndConditions, requestData)
		.then(function(data){
			setTimeout(function() {
				currentThis.setState({
					termAndConditionMessage:data.response.tncText
				})	
			}, 0);
			setTimeout(function() {
				$('#termAndConditionMessage').html((currentThis.state.termAndConditionMessage).replace(/^\s+|\s+$/g, ''));
			}, 0);
		})
		.catch(function(error){
		});	
	},
	render: function(){
		return (
			<div className="main tc-page">
				<div className="main-content">
					<div className="page-title">
						<h1>Term & Conditions</h1>
						<div className="filter-block edit">
							<a href="#" name="edit" onClick={this._onClick}>Edit</a>
						</div>
					</div>
					{	!this.state.edit	&&
						<div className="content">
							<div className="tc-block">
								<p className="abt-text">
									<div id="termAndConditionMessage"></div>
								</p>
							</div>
						</div>}

					{	this.state.edit	&&
						<div className="content">
							<div className="tc-block">
								<p className="abt-text">
									<textarea rows="10" cols="15" name="termAndConditionMessage"  value={this.state.termAndConditionMessage}></textarea>
									<div className="orangeBtn">
									    <button type="button" name="change" className="btn" onClick={this._onClick}>Save</button>
									</div>
								</p>
							</div>
						</div>}
				</div>
			</div>	
		);
	},
	_onClick: function(event){
		var currentThis = this;
		if($(event.target).attr("name") == "edit"){
			setTimeout(function() {
				currentThis.setState({
					edit:true
				})	
			}, 0);
			setTimeout(function() {
				CKEDITOR.replace( 'termAndConditionMessage' )
			}, 0);	
		}
		else if($(event.target).attr("name") == "change"){
			var requestData = {};
			requestData.token = this.state.token
			requestData.tncText = CKEDITOR.instances.termAndConditionMessage.getData();
			services.POST(config.url.postTermAndConditions, requestData)
			.then(function(data){
				if(data.response.flag){
					setTimeout(function() {
					currentThis.setState({
						termAndConditionMessage:CKEDITOR.instances.termAndConditionMessage.getData(),
						edit:false
					})	
					}, 0);
					setTimeout(function() {
						$('#termAndConditionMessage').html((currentThis.state.termAndConditionMessage).replace(/(\r\n|\n|\r)/gm," "));
					}, 0);
				}
			})
			.catch(function(error){
			})
		}
	}
});