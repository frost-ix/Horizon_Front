import store from "../store";
import { ReduxLoginSessionAction } from "./LoginSession";

export const LoginSessionDispatch = (userName:String|null,userId:String|null) => {
    store.dispatch(
        ReduxLoginSessionAction({
          userName:userName,
          userId:userId
        })
      )
}
