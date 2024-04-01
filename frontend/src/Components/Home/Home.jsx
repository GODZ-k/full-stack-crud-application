import { useEffect, useState } from "react";
import {Card , Form} from "../index.js";
import axios from "axios"
import LoadingBar from 'react-top-loading-bar'
import loadingSpinner from '../svg/icons8-loading-circle.gif';

function Home() {

  const [data, setdata] = useState([])
  const [Loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  async function getAllBook(){
    const response =await axios.get("http://localhost:3000/api/v1/books")
    const AllData = await response.data
    setdata(AllData.data)
    setLoading(false)
    setProgress(100)
    return AllData.data
  }


  useEffect(()=>{
      getAllBook()
  },[data])

  return (
    <>
    <LoadingBar
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
    <div>
      <Form/>
    </div>
     <div className="flex flex-wrap">
     {
      data.length ? Loading ? (
        <div className=" w-full flex justify-center items-center ">
          <img src={loadingSpinner} alt="" />
        <p className="px-1">Loading ...</p>
        </div>
      ) :
      <Card data={data}/> : <p className="w-full text-center py-7">No data found</p>
     }
     </div>
    </>
  );
}

export default Home;
