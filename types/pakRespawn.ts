import Pak from "./pak"
import User from "./user"
export default interface PakRespawn {
  _id?: string
  expireDate: Date
  startDate: Date
  isCheck: boolean
  pak?: Pak
  user?: User
  createdBy: string
}