import moment from "moment"
import dynamic from 'next/dynamic'

import Image from "next/image"
const CardPak = dynamic(import("./cardPak/cardPak"))

import PakRespawn from "../../types/pakRespawn"
import { useEffect, useState } from "react"

interface PropsCardPaks {
  pakTimeStampList: PakRespawn[]
  loadingAPI: Boolean
  userId: string
  notify: () => void
}

export default function CardPaks(props: PropsCardPaks) {
  const TIME_CAN_EDIT = 59;
  const { pakTimeStampList, loadingAPI, userId, notify } = props
  const [time, setTime] = useState(new Date());

  const handleCheckPak = async (pak: PakRespawn, isFind: Boolean) => {
  }
  const displayPakTimeStampList = pakTimeStampList.filter(pak => !pak.isCheck)

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
  
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 mb-3 min-h-[344px]">
        {
          !loadingAPI ?
            displayPakTimeStampList.length > 0 ?
              displayPakTimeStampList.map((pak, index) => (
                <CardPak 
                  key={`${pak._id}-${index}`}
                  pak={pak}
                  handleCheckPak={handleCheckPak}
                  notify={notify}
                  disabledCheckPak={pak.createdBy !== userId && moment().diff(pak.expireDate, 'minutes') < TIME_CAN_EDIT}
                  time={time}
                />
              ))
              : <div className="self-center text-white text-xl col-span-12 text-center">
                <Image
                  src={"/nya.png"}
                  alt={`nya`}
                  width={180}
                  height={40}
                  className="m-auto mb-3"
                  priority
                />
                <div className="text-[#6B86CF] text-4xl font-extrabold mb-3">No Pak Result</div>
                <div className="">Please Select Pak Timestamp</div>
                <div>From Below Section</div>
              </div>
            : <div className="self-center text-white text-xl col-span-12 text-center">
                <Image
                    src={"/nya.png"}
                    alt={`nya`}
                    width={180}
                    height={40}
                    className="m-auto mb-3"
                    priority
                  />
                <div className="text-[#6B86CF] text-4xl font-extrabold mb-3 inline-flex">
                  Loading... 
                  <Image
                      src={"/nya.png"}
                      alt={`nya`}
                      width={50}
                      height={50}
                      className="m-auto ml-2 mb-3 animate-spin border border-[#615f58]"
                      priority
                    />
                  </div>
              </div>
        }
      </div>
    </>
  )
}
