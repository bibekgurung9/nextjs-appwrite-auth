import conf from '@/conf/conf';
import { Client, Account, ID } from 'appwrite'; //what things you need to deal with others: databases, etc;
import { unique } from 'next/dist/build/utils';

type CreateUserAccount = {
  email: string,
  password: string,
  name: string,
}

type LoginUserAccount = {
  email: string,
  password: string,
}

const appWriteClient = new Client()

appWriteClient.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);

export const account = new Account(appWriteClient)

export class AppwriteService{
  //create a new record of user in appwrite
  async createUserAccount({email, password, name}:CreateUserAccount){
    try{
       const userAccount =  await account.create(ID.unique(), email, password, name)
       if(userAccount){
        return this.login({email, password})
       } else {
        return userAccount;
       }
    } catch(error){
      throw error;
    }
  }

  async login({email, password}: LoginUserAccount){
    try{
      return await account.createEmailSession(email, password)
    } catch(error:any){
      throw error;
    }
  }

  async isLoggedIn():Promise<boolean> {
    try{
      const data = await this.getCurrentuser();
      return Boolean(data)
    } catch(error) {}
    
    return false;
  }

  async getCurrentuser() {
    try{
        return account.get()
    } catch(error) {
      console.log("Get Current User Error: " + error)
    }
    return null;
  }

  async logout() {
    try{
      return await account.deleteSession("current");
    } catch(error){
      console.log("logout error:  " + error);
    }
  }
}

const appwriteService = new AppwriteService()

export default appwriteService