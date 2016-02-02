var baseUrl = 'http://52.91.173.133'
var config = {
	url: {
		adminLogin:baseUrl+'/rest/connect',
		getAllClub:baseUrl+'/rest/service/getClubListForSuperAdmin',
		getClubMembers:baseUrl+'/rest/service/getClubMembersListForSuperAdmin',
		getClubRides:baseUrl+'/rest/service/rideList',
		getAllUser:baseUrl+'/rest/service/userList',
		getTermAndConditions:baseUrl+'/rest/service/showTnc',
		postTermAndConditions:baseUrl+'/rest/service/tnc',
		getAboutUs:baseUrl+'/rest/service/aboutHtml',
		postAboutUs:baseUrl+'/rest/service/aboutUs',
		changePassword:baseUrl+'/rest/service/resetPassword',
		updateProfile:baseUrl+'/rest/service/setting',
		userListFilter:baseUrl+'/rest/service/filter'
	},
	pagination:{
		pageSize:5
	}
}