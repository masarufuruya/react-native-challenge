import firebase from 'firebase'
import 'firebase/firestore'
import { config } from './config'

export default class Fire {
  constructor() {
    firebase.initializeApp(config)
  }
}
