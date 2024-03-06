import store from "../store";
import { ReduxLoginSessionAction } from "./LoginSession";

export const LoginSessionDispatch = (userName:String,userId:String) => {
    store.dispatch(
        ReduxLoginSessionAction({
          userName:userName,
          userId:userId
        })
      )
}
