import moment from "moment"
import PakRespawn from "../../../types/pakRespawn"
interface propsRespawnTime {
  pak: PakRespawn
  time: Date
  notify: () => void
}

const TextRespawnTime = (props: propsRespawnTime) => {
  const { pak, time, notify } = props
  const _pak = pak ?? {
    _id: "",
    expireDate: "",
    startDate: "",
    isCheck: "",
    pak: "",
    user: "",
    createdBy: ""
  }

  let textRespawn = ""
  const respawnTimeDiff = moment(time).diff(_pak.startDate, 'second')
  const respawnTimeSecond = respawnTimeDiff * -1
  const respawnTimeMinute = Math.floor(respawnTimeDiff / 60) * -1
  
  if (respawnTimeSecond < 60 && respawnTimeSecond > 0) {
    textRespawn = `Respawn in ${respawnTimeSecond} seconds`
  } else {
    if (respawnTimeMinute > 1 || (respawnTimeMinute * -1) > 1) {
      textRespawn = `Respawn in ${respawnTimeMinute} minutes`
    } else {
      textRespawn = `Respawn in ${respawnTimeMinute} minute`
    }
  }

  const respawnPakToClipboard = () => {
    navigator.clipboard.writeText(`${_pak.pak?.name} [001] ${textRespawn}`);
    notify()
  }
  
  return (
    <div className="text-[18px] cursor-pointer" onClick={ respawnPakToClipboard }>
      { textRespawn }
    </div>
  )
}

export default TextRespawnTime
