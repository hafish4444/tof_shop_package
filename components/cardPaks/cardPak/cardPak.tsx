import moment from "moment"
import PakRespawn from "../../../types/pakRespawn"
import PakImage from "./pakImage";
import TextRespawnTime from "./textRespawnTime";

interface propsCardPak {
  pak: PakRespawn
  time: Date
  disabledCheckPak?: boolean
  handleCheckPak: (pak: PakRespawn, isFind: Boolean) => void
  notify: () => void
}

export default function CardPak(props: propsCardPak) {
  const { pak, disabledCheckPak, time, handleCheckPak, notify } = props

  return (
    <div className="bg-[#212134] text-white rounded border border-[#242442] shadow-lg dark:shadow-none">
      <div className="relative h-[182px]">
        <PakImage
          imageUrl={pak.pak?.imageUrl ?? ""} 
          pakName={pak.pak?.name ?? ""} 
        />
      </div>
      <div className="px-4 my-2">
        <div className="text-[22px] font-bold truncate">{pak.pak?.name ?? ""}</div>
      </div>
      <div className="px-4 pb-4">
        <div className="text-[18px] cursor-pointer" >
            { `100%` }
        </div>
        <div className="flex justify-between items-center">
          <div className="text-[20px]">
            { pak.pak?.amountTanium ? `จำนวน ${pak.pak?.amountTanium} Tanium` : `ราคา ${pak.pak?.price} บาท` }
          </div>
          {
            <div  className="relative">
              <button className="rounded-full bg-green-600 p-2 text-center w-[34px] h-[34px] mr-1 text-[12px]" onClick={() => handleCheckPak(pak, true)}>✓</button>
            </div>
          }
        </div>
      </div>
    </div>
  )
}
