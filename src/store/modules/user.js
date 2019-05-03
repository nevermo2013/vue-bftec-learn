import loginUserApi from '@/api/loginUserApi'
import storage from '@/util/storage'
import router from '@/router'
const user = {
	namespaced: true,
	state: {
		user:{
			roles: '',
			avatar: ''
		},
	},
	mutations: { 
   		SET_USER_INFO(state,user){
   			state.user = user;
   		}
    },
	actions: { 
		getUserInfo({commit}){
			return new Promise(resolve=>{
				loginUserApi.getUserInfo().then(res=>{
					var user = res.user
					user.avatar = res.avatar
					user.roles = res.roles
					//存入本地
					storage.save('BFTEC_USER',user)
					commit('SET_USER_INFO',user)
					resolve()
				})
			})

			
		},
		logOut(){
			loginUserApi.doLogout()
                        .then(res=>{
                            if(res.data.code='S'){
                                router.replace('/login');
                            }
                        })
			storage.del('ms_username');
		  	storage.del('BFTEC_USER');
		  	console.log('do logOut...');
		},
		FedLogOut({ commit }) {
		  return new Promise(resolve => {
		  	localStorage.removeItem('ms_username');
		  	storage.del('BFTEC_USER');
		    resolve()
		  })
		},

    },
	getters: { 

	}
}
export default user