var TermAndConditions = React.createClass({
	getInitialState: function (){
		return {
			token: localStorage.getItem("wikedrideSuperAdminIsLogin") ? JSON.parse(localStorage.getItem("wikedrideSuperAdminIsLogin")).token : "",

			termAndConditionMessage:"ram",
			edit:false,
			error:false,
			errorMessage:""
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
					termAndConditionMessage:data.response.tncText.trim() ? data.response.tncText : "No data found" 
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
		var currentThis = this;
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
									<textarea rows="10" cols="15" name="termAndConditionMessage"  defaultValue={this.state.termAndConditionMessage}></textarea>
									<div className="btnBlockOuter">
										<span className="errorMessageBlock">
											{	this.state.error &&
										<div>{this.state.errorMessage}</div> }
										</span>
										<span className="rightBtn">
											<span className="orangeBtn">
											    <button type="button" name="cancel" className="btn" onClick={this._onClick}>Cancel</button>
											</span>
											<span className="orangeBtn">
											    <button type="button" name="change" className="btn" onClick={this._onClick}>Save</button>
											</span>
										</span>
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
		if($(event.target).attr("name") == "edit" && !this.state.edit){
			setTimeout(function() {
				currentThis.setState({
					edit:true
				})	
			}, 0);
			setTimeout(function() {
				CKEDITOR.replace( 'termAndConditionMessage' )
			}, 0);	
		}else if($(event.target).attr("name") == "cancel"){
			setTimeout(function() {
				currentThis.setState({
					edit:false,
					error:false,
					errorMessage:""
				})	
			}, 0);
			setTimeout(function() {
				$('#termAndConditionMessage').html((currentThis.state.termAndConditionMessage).replace(/(\r\n|\n|\r)/gm," "));
			}, 0);
		}
		else if($(event.target).attr("name") == "change"){
			var requestData = {};
			requestData.token = this.state.token
			requestData.tncText = CKEDITOR.instances.termAndConditionMessage.getData();
			if(requestData.tncText.trim()){
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
					currentThis.setState({
						error: true,
						errorMessage:"SomeThing goes wrong oops"
					})
				})
			}else{
				currentThis.setState({
					error: true,
					errorMessage:"Term And Conditions can't be branck"
				})	
			}
		}
	}
});