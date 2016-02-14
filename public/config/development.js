var baseUrl = 'http://52.91.173.133'
var config = {
	url: {
		adminLogin:baseUrl+'/rest/connect',
		getAllClub:baseUrl+'/rest/service/getClubListForSuperAdmin',
		getClubMembers:baseUrl+'/rest/service/getClubMembersListForSuperAdmin',
		getClubMemberNameList:baseUrl+'/rest/service/getClubMemberNameListForSuperAdmin',
		getClubRides:baseUrl+'/rest/service/rideList',
		getClubRideMembers:baseUrl+'/rest/service/rideMembers',
		getAllUser:baseUrl+'/rest/service/userList',
		getTermAndConditions:baseUrl+'/rest/service/showTnc',
		postTermAndConditions:baseUrl+'/rest/service/tnc',
		getAboutUs:baseUrl+'/rest/service/aboutHtml',
		postAboutUs:baseUrl+'/rest/service/aboutUs',
		changePassword:baseUrl+'/rest/service/resetPassword',
		updateProfile:baseUrl+'/rest/service/setting',
		userListFilter:baseUrl+'/rest/service/filter',
		getMemberDetail:baseUrl+'/rest/service/memberDetail',
		removeMember:baseUrl+'/rest/service/removeClubMember',
		getDeleteRequests:baseUrl+'/rest/service/deleteRequests',
		makeNewAdmin:baseUrl+'/rest/service/makeNewAdmin',
		handleClubDeleteRequest:baseUrl+'/rest/service/handleClubDeleteRequest',
		changeRole:baseUrl+'/rest/service/changeRole'

	},
	pagination:{
		pageSize:20
	}
}

