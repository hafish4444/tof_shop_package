import Head from 'next/head'
import { v4 as uuidv4 } from 'uuid';


import 'react-toastify/dist/ReactToastify.css';

import Pak from "../../types/pak"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import CardPaks from '../../components/cardPaks/cardPaks';
import ListTablePaks from '../../components/listTablePaks/listTablePaks';
import { useEffect, useState } from 'react';
import PakRespawn from '../../types/pakRespawn';
import moment from 'moment';
interface PropsHome {
  pakList: Pak[]
}
interface optionProps {
  label: string
  value: string
}

function round(
  value: number,
  minimumFractionDigits: number,
  maximumFractionDigits: number
) {
  const formattedValue = value.toLocaleString('en', {
    useGrouping: false,
    minimumFractionDigits,
    maximumFractionDigits
  })
  return Number(formattedValue)
}


export async function getServerSideProps() {
  const defaultProps: PropsHome = {
    pakList: []
  }
  return { props: defaultProps }
}

export default function Home(props: PropsHome) {
  const { pakList } = props

  const [userId, setUserId] = useState<string>("");
  const [pakTimeStampList, setPakTimeStampList] = useState<Array<PakRespawn>>([]);
  const [loadingAPI, setLoadingAPI] = useState<boolean>(true);

  const amountPakageTanium = 6480
  const amountPerDarkCrystal = 1300
  const pricePakageTanium = 1499
  const pricePerTanium = amountPakageTanium/pricePakageTanium
  const pricePerDarkCrystal = amountPerDarkCrystal/pricePakageTanium

  const calculatePercent = (data: Pak|undefined) => {
    if (data) {
      data.darkCrystal = data.darkCrystal ?? 0
      data.amountRedNucleus = data.amountRedNucleus ?? 0
      data.amountRedVocher = data.amountRedVocher ?? 0
      data.price = data.price ?? 0
      data.amountTanium = data.amountTanium ?? 0
      console.log('fish data.darkCrystal', data.darkCrystal)
      console.log('fish data.amountRedNucleus', data.amountRedNucleus)
      console.log('fish data.amountRedVocher', data.amountRedVocher)
      console.log('fish data.price', data.price)
      console.log('fish data.amountTanium', data.amountTanium)

      console.log('fish data.darkCrystal', typeof data.darkCrystal)
      console.log('fish data.amountRedNucleus', typeof data.amountRedNucleus)
      console.log('fish data.amountRedVocher', typeof data.amountRedVocher)
      console.log('fish data.price', typeof data.price)
      console.log('fish data.amountTanium', typeof data.amountTanium)
      console.log((data.darkCrystal + (data.amountRedNucleus * 150) + (data.amountRedVocher * 150) - (pricePerDarkCrystal * data.price)))
      console.log((data.amountTanium + (pricePerTanium * data.price)))
      return round(( (data.darkCrystal + (data.amountRedNucleus * 150) + (data.amountRedVocher * 150) - (pricePerDarkCrystal * data.price)) / (data.amountTanium + (pricePerTanium * data.price)) ) * 100, 2, 2);
    }
    return 0
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/pakList.json');
        const data: Array<Pak> = await response.json();
        const _pakTimeStampList: Array<PakRespawn> = data.map(data => {
          data.percent = calculatePercent(data)
          return {
            _id: "",
            expireDate: new Date(),
            startDate: new Date(),
            isCheck: false,
            createdBy: userId,
            pak: data
          }
        })
        setPakTimeStampList(_pakTimeStampList);
        setLoadingAPI(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoadingAPI(false);
      }
    };

    fetchData();
    getUserId();
  }, []);
  
  const notify = () => {
    toast('⌨ Copy to clipboard!', {
      position: "bottom-left",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      pauseOnFocusLoss: false,
      theme: "light",
    });
  }

  const getUserId = async () => {
    if (typeof window !== "undefined") {
      const userId = window.localStorage.getItem('userId') ?? uuidv4()
      window.localStorage.setItem('userId', userId)
      setUserId(userId)
    }
  }
  
  const setValuePak = (value: string | number, index: number, name: string) => {
    setPakTimeStampList((prevPakTimeStampList) => {
      const updatedPakTimeStampList = [...prevPakTimeStampList];
      if (updatedPakTimeStampList[index].pak !== undefined) {
        if (typeof ((updatedPakTimeStampList[index].pak as Pak)[name as keyof Pak]) === 'number') { 
          value = Number(value)
        }
        const pak = {
          ...updatedPakTimeStampList[index].pak,
          [name]: value,
        } as Pak
        pak.percent = calculatePercent(pak);
        updatedPakTimeStampList[index] = {
          ...updatedPakTimeStampList[index],
          pak: pak,
        };
      } else {
        console.error("Pak is undefined at index", index);
      }
      return updatedPakTimeStampList;
    });
  };

  return (
    <>
      <Head>
        <title>TOF Package</title>
        <meta
          name="description"
          content="Tower of fantasy Package "
          key="desc"
        />
        <meta property="og:title" content="TOF Package" key="title" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="google-site-verification"
          content="google-site-verification=zIkcETD8qYWkP-dWjLb0Q8-LsOQglFpNKiZrzwva2oc"
        />
      </Head>
      <div className="min-h-screen bg-[#181826]">
        <div className="max-w-8xl mx-auto px-4 py-8 sm:px-6 md:px-8">
          <h1 className="max-w-8xl text-white mb-3 text-3xl font-bold">Boss Respawn: Report</h1>
          <div className="text-white">
            { pricePerTanium } <br></br>
            { pricePerDarkCrystal }
          </div>
          <ListTablePaks 
              userId={userId}
              pakTimeStampList={pakTimeStampList}
              loadingAPI={loadingAPI}
              notify={notify}
              handleChangeValue={setValuePak}
            />
          {/* <CardPaks
            userId={userId}
            pakTimeStampList={pakTimeStampList}
            loadingAPI={loadingAPI}
            notify={notify}
          /> */}
        </div>
        <ToastContainer
          position="bottom-left"
          autoClose={2000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </>
  )
}
