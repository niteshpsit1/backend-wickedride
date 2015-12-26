var AllClubsInfo = React.createClass({

	getInitialState: function(){
		var allClubsList = [
			{clubName:"club1",admin:"admin1"},
			{clubName:"club2",admin:"admin2"},
			{clubName:"club3",admin:"admin3"},
			{clubName:"club4",admin:"admin4"}
		];
		return {
			allClubsList: allClubsList
		};	
	},
	componentWillUpdate: function () {
		
	},
	render: function () {
		
		return (
			<div>
			 	<span>myclubs</span>
			 	{this.state.allClubsList.map(function(clubInfo){
			 		return <span>{clubInfo.clubName} <span></span> {clubInfo.admin}</span>
			 	})}
			 	<span>Admin {this.props.token}</span>
			</div>
		);
	}
});