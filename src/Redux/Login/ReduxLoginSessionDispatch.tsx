import store from "../store";
import { ReduxLoginSessionAction } from "./LoginSession";

export const LoginSessionDispatch = (userName:String,userId:String,userPwd:String) => {
    store.dispatch(
        ReduxLoginSessionAction({
          userName:userName,
          userId:userId,
          userPwd:userPwd
        })
      )
}
