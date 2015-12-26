var AboutUs = React.createClass({
	getInitialState: function (){
		return {
			aboutUsMessage:'<p>ram \n sadf n</p>',
			edit:false
		}
	},
	componentWillMount: function () {
		var currentThis = this;
		var requestData = {
			token: this.props.token
		};
		services.POST(config.url.getAllClub, requestData)
		.then(function(data){
			setTimeout(function() {
				currentThis.setState({
					//aboutUsMessage:data.response.message
				})	
			}, 0);
			setTimeout(function() {
				$('#aboutUsMessage').html((JSON.stringify(currentThis.state.aboutUsMessage)).replace(/^\s+|\s+$/g, ''));
			}, 0);
		})
		.catch(function(error){
			console.log("====catch",error);	
		});	
	},
	render: function(){
		return (
			<div>
				{	!this.state.edit	&&
					<div>
					<button type="button" name="edit" class="btn btn-primary" onClick={this._onClick}>EDIT</button>
					<div id="aboutUsMessage"></div>
					</div>}

				{	this.state.edit	&&
					<div>
					<textarea rows="10"  cols="15" name="aboutUsMessage"  value={this.state.aboutUsMessage}></textarea>
					<button type="button" name="change" class="btn btn-danger"  onClick={this._onClick}>CHANGE</button>
					</div>}
			
			</div>
		);
	},
	
	_onClick: function(event){
		console.log("asdfsd");
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
			console.log("asdfsd");
			setTimeout(function() {
				currentThis.setState({
					aboutUsMessage:CKEDITOR.instances.aboutUsMessage.getData(),
					edit:false
				})	
			}, 0);
			setTimeout(function() {
				$('#aboutUsMessage').html(JSON.stringify(currentThis.state.aboutUsMessage).replace(/(\r\n|\n|\r)/gm," "));
			}, 0);
		}
	}
});