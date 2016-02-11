var AboutUs = React.createClass({
	getInitialState: function (){
		return {
			token: localStorage.getItem("wikedrideSuperAdminIsLogin") ? JSON.parse(localStorage.getItem("wikedrideSuperAdminIsLogin")).token : "",
			aboutUsMessage:'',
			edit:false
		}
	},
	componentWillMount: function () {
		var currentThis = this;
		var requestData = {
			token: this.state.token
		};
		services.POST(config.url.getAboutUs, requestData)
		.then(function(data){
			setTimeout(function() {
				currentThis.setState({
					aboutUsMessage:data.response.htmlText
				})	
			}, 0);
			setTimeout(function() {
				$('#aboutUsMessage').html((currentThis.state.aboutUsMessage).replace(/^\s+|\s+$/g, ''));
			}, 0);
		})
		.catch(function(error){
			console.log("====catch",error);	
		});	
	},
	render: function(){
		return (
			<div className="main about-us-page common-table">
				<div  className="main-content">
					<div className="page-title">
						<h1>About</h1>
						<div className="filter-block edit">
							<a href="#" name="edit" onClick={this._onClick}>Edit</a>
						</div>
					</div>
					{	!this.state.edit	&&
						<div className="content">
							<div className="abt-text-block">
								<p className="abt-text">
									<div id="aboutUsMessage"></div>
								</p>
							</div>
						</div>}

					{	this.state.edit	&&
						<div className="content">
							<div className="abt-text-block">
								<p className="abt-text">
									<div>
									<textarea rows="10"  cols="15" name="aboutUsMessage"  value={this.state.aboutUsMessage}></textarea>
									<button type="button" name="change" className="btn btn-danger"  onClick={this._onClick}>CHANGE</button>
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
				CKEDITOR.replace( 'aboutUsMessage' );
			}, 0);	
		}
		else if($(event.target).attr("name") == "change"){
			var requestData = {};
			requestData.token = this.state.token;
			requestData.htmlText = CKEDITOR.instances.aboutUsMessage.getData();
			services.POST(config.url.postAboutUs, requestData)
			.then(function(data){
				if(data.response.flag){
					setTimeout(function() {
						currentThis.setState({
							aboutUsMessage:CKEDITOR.instances.aboutUsMessage.getData(),
							edit:false
						})	
					}, 0);
					setTimeout(function() {
						$('#aboutUsMessage').html((currentThis.state.aboutUsMessage).replace(/^\s+|\s+$/g, ''));
					}, 0);
				}
			})
			.catch(function(error){

			})
		}
	}
});