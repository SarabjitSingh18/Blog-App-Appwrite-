import conf from '../conf/conf'

//import essentials from appwrite
import { Client, Account, ID } from "appwrite";


//now lets write quality code 

export class AuthService {
    client = new Client() //creating but not initializing
    account; //we should not create a account here beacuse it wil be the wastage of resources and hence we should create a account when a object is created 
    constructor() {
        this.client
            .setEndpoint(conf.appwriteURl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client)

    }
    // this method requires necessary changes if someday we want to change our backend services we can and it very efficient way because the parameters are same that we are using and hence our overall app doesnot gets any disturbance
    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if (userAccount) {
                return this.Login({ email, password })
                // return userAccount  // we can do this but we are going to create a directly login forcefully functionality

            }
            else {
                return userAccount;
            }


        } catch (error) {
            throw error;

        }
    }
    async Login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password)



        } catch (error) {
            throw error

        }
    }
    async getCurrentUser() {
        try {
            return await this.account.get()


        } catch (error) {
            console.log("Appwrite Service:: error ::getCurrentUser::error ", error)

        }
        return null
    }
    async Logout() {
        try {
            await this.account.deleteSessions()

        } catch (error) {
            console.log("Appwrite Service:: error ::logout ", error)

        }
    }

}

//to use this class we have to create a object so we are going to create the object here in this file so the other side of the other files remains isolated ok 
const authService = new AuthService() //creating  a object from class AuthService()
export default authService//export the object directly


// about this file this is very future proff code because this one usually do not effect the other files of the application