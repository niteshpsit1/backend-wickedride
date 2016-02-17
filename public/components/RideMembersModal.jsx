var RideMembersModal = React.createClass({

 getInitialState : function(){
  return {
   members : [],
   membersAvailable: false,
   notAvailable : false
  };
 },
 componentWillMount: function() {
  
  var self= this,
        result = [];
  var requestData = {
   token: this.props.token,
   rideID: this.props.rideID
  };
  services.GET(config.url.getClubRideMembers, requestData)
  .then(function(data){
   result=data.response.result;
   if(result.length) {
    self.setState({members:data.response.result,membersAvailable:true});
   }else {
    self.setState({notAvailable: true});
            }
  })
     .catch(function(error){
  });
        

 },
    
 componentDidMount: function() {

  $(React.findDOMNode(this)).modal('show');
  $(React.findDOMNode(this)).on('hidden.bs.modal', this.props.handleHideRideMembersModal);
 },

 render: function () {
  var self = this;
  return (
            
   <div id="myModal" className="modal fade" role="dialog">
       <div className="modal-dialog">
           <div className="modal-content">
           <div className="modal-header">
               <div className="page-title">
                   <span className="ride rideIcon"></span>
                <h1 className="withIcon">Ride Members Listing</h1>
                <div className="filter-block"  data-dismiss="modal">
                 <a href="#"></a>
                </div>
               </div>
           </div>
                    { this.state.membersAvailable &&
           <div className="modal-body">
            
         <table cellSpacing="0"  className="club-details">
          <th>Member Name</th>
          <th>Designation</th>
          <th>Number of clubs</th>
          <tbody>
          {this.state.members.map(function(member){
              
            return( <tr key={member.memberID}>
                                    <td><p>{member.memberName}</p></td>
                                    <td><p>{member.designation}</p></td>
                                    <td><p>{member.noOfClubJoined}</p></td>
                                   </tr>)
           })}
          </tbody>
         </table>
            
           </div>}
           { this.state.notAvailable && 
            <div className="modal-body">
                <div>
                    <h3>No Member present.</h3>
                </div>
            
           </div>}
       </div>
   </div>
   </div>
   
  )
    }

});