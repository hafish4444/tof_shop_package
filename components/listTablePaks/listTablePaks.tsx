import PakRespawn from "../../types/pakRespawn"
import PakTableImage from "./pakTableImage"
import { useEffect, useState } from "react"
import Image from "next/image"
import Input from "../input"
import Textarea from "../textarea"

interface PropsListTablePaks {
  pakTimeStampList: PakRespawn[]
  loadingAPI: Boolean
  userId: string
  handleChangeValue: (value: string|number, index: number, name: string) => void
  notify: () => void
}

export default function ListTablePaks(props: PropsListTablePaks) {
  const { pakTimeStampList, loadingAPI, handleChangeValue } = props
  return (
    <>
      <div className="mb-3 min-h-[344px]">
        {
          !loadingAPI ?
            pakTimeStampList.length > 0 ?
              <div className='bg-[#353541] text-white px-5 py-4 rounded overflow-auto max-w-full'>
                <table className="table-full w-full">
                  <thead className='bg-[#252531] border-b border-gray-500'>
                    <tr>
                      <th className='p-3'>Image</th>
                      <th className='p-3'>Pak Name</th>
                      <th className='p-3'>Amount Tanium</th>
                      <th className='p-3'>Price</th>
                      <th className='p-3'>Dark Crystal</th>
                      <th className='p-3'>Amount Red Nucleus</th>
                      <th className='p-3'>Amount Red Voucher</th>
                      <th className='p-3'>Description</th>
                      <th className='p-3'>Percent</th>
                      {/* Add additional table headers based on your needs */}
                    </tr>
                  </thead>
                  <tbody className='bg-[#52525C]'>
                    {/* Map through pakTimeStampList and render table rows */}
                    {pakTimeStampList.map((pakData, index) => (
                      <tr key={index}>
                        <td>
                          <div className="relative h-[232px] w-[298px]">
                            <PakTableImage
                              imageUrl={pakData.pak?.imageUrl ?? ""} 
                              pakName={pakData.pak?.name ?? ""} 
                            />
                          </div>
                        </td>
                        <td className='px-3 py-2 text-center'>
                          <Textarea
                            id="nameSearchInput"
                            value={pakData.pak?.name}
                            label=""
                            onChange={(e: any) => handleChangeValue(e.target.value, index, "name")}
                          />
                        </td>
                        <td className='px-3 py-2 text-center'>
                          <Input
                            id="amountTaniumSearchInput"
                            value={pakData.pak?.amountTanium}
                            type="number"
                            label=""
                            onChange={(e: any) => handleChangeValue(e.target.value, index, "amountTanium")}
                          />
                        </td>
                        <td className='px-3 py-2 text-center'>
                          <Input
                            id="priceSearchInput"
                            value={pakData.pak?.price}
                            type="number"
                            label=""
                            onChange={(e: any) => handleChangeValue(e.target.value, index, "price")}
                          />
                        </td>
                        <td className='px-3 py-2 text-center'>
                          <Input
                            id="darkCrystalSearchInput"
                            value={pakData.pak?.darkCrystal}
                            type="number"
                            label=""
                            onChange={(e: any) => handleChangeValue(e.target.value, index, "darkCrystal")}
                          />
                        </td>
                        <td className='px-3 py-2 text-center'>
                          <Input
                            id="amountRedNucleusSearchInput"
                            value={pakData.pak?.amountRedNucleus}
                            type="number"
                            label=""
                            onChange={(e: any) => handleChangeValue(e.target.value, index, "amountRedNucleus")}
                          />
                        </td>
                        <td className='px-3 py-2 text-center'>
                          <Input
                            id="amountRedVocherSearchInput"
                            value={pakData.pak?.amountRedVocher}
                            type="number"
                            label=""
                            onChange={(e: any) => handleChangeValue(e.target.value, index, "amountRedVocher")}
                          />
                        </td>
                        <td className='px-3 py-2 text-center'>
                          <Textarea
                            id="descSearchInput"
                            value={pakData.pak?.desc}
                            label=""
                            onChange={(e: any) => handleChangeValue(e.target.value, index, "desc")}
                          />
                        </td>
                        <td className='px-3 py-2 text-center'>{pakData.pak?.percent} %</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
