import { Auth } from "aws-amplify";

interface Auth {
  signIn: (username: string, password: string) => Promise<boolean>;
  signOut: () => Promise<boolean>;
  currentUserInfo: () => Promise<any>;
}

class AuthService {
  public async login(username: string, password: string): Promise<boolean> {
    try {
      return await Auth.signIn(username, password);
    } catch (error) {
      throw new Error("Error signing in");
    }
  }

  public async logout(): Promise<boolean> {
    try {
      return await Auth.signOut();
    } catch (error) {
      throw new Error("Error signing out");
    }
  }

  public async getCurrentUserInfo(): Promise<any> {
    return await Auth.currentUserInfo();
  }

  public async isAuthenticated(): Promise<boolean> {
    const user = await Auth.currentUserInfo();
    return !!user?.id;
  }

  public async getUser(): Promise<any> {
    return await Auth.currentAuthenticatedUser();
  }
}

export default AuthService;
