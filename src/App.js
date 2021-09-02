import React from 'react';
import { short } from './API/Data';
import styles from "./App.module.css";
import copy from  "copy-to-clipboard";
import { useState } from 'react';
import { SearchOutlined, FileCopyOutlined } from "@material-ui/icons";
import { Button } from "@material-ui/core";


const App = ({value}) => {
  const [url, setUrl] = useState([]);
  const [result, setResult] = useState([]);

  const getInfo=async()=>{
    try{
      if(url.length === 0){
          return alert("please fill the box");
      }
         const getResult=await short(url);
         setResult([getResult]);
    }catch(error){
       console.log(error);
    };
  };


  const copied =()=>{
    const output =document.querySelector("#output").innerHTML;
    copy(result[0].result_url);
    alert("Successfully Copied" + result[0].result_url);
  };
  

  return (
    <div className={styles.container}>
      <div className="company"><h2>Cleanuri.com</h2> </div>
      <h1>Paste a link to shorten it</h1>
      <div className={styles.inputBox}>
         <input 
           type="url"
           onChange={(e)=>setUrl(e.target.value)}
           value={url}
           placeholder="Original URL" />
          <SearchOutlined
           clasName={styles.search}
           onClick={getInfo} />
      </div>

       <Button className={styles.btn} onClick={getInfo}>
         Shorten
       </Button>

        {result.length >0 && result[0].result_url ?(
          <div className={styles.result} onClick={copied}>
            <h2 id="output">
            {result.length > 0 && result[0].result_url
              ?result[0].result_url
             : null}
          </h2>
          <FileCopyOutlined className={styles.file} />
          </div>
        ): null}

    </div>
  )
}

export default App
