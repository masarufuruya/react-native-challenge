import { Container } from "unstated";
import { User } from "../types/user"

type State = {
  user: User
}

export default class AuthUserStore extends Container<State> {
  state = {
    user: null
  }

  setAuthUser = (user: User) => {
    this.setState({ user })
  }
}
