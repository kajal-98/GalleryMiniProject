import react,{useState,useEffect} from "react";
import axios from "axios";
import  Card  from "./Card";
import { Navbar } from "./Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";

export function Gallery() {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); 
  const[tabIndex,setTabIndex]=useState(1);
  const[isLocalStorage,setIsLocalStorage]=useState(false);
// let tabIndex=1;
// useEffect(() => {
//     // fetchImages();
//   }, [tabIndex]);

 const fetchImages = async (tabchange) => {
    console.log(tabchange);
    try{
      setLoading(true);
      setError(null);
      const response = await axios.get(`https://picsum.photos/v2/list?page=${tabchange}&limit=1`);
      setImages(response.data);
      console.log(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
 };

 function FetchImagesfromLocalStorage(tabIndex) {
  const storedItems = localStorage.getItem('items');
  if (storedItems && isLocalStorage) {
    const parsedItems = JSON.parse(storedItems);
    const filteredImages = parsedItems.filter(item => item.itemType === 'image');
    setImages(filteredImages);
    setLoading(false);
  }
  else{
    fetchImages(tabIndex);
  }
}

  return(
    <>
    <Navbar />
    <div>
        <h1>Welcome to the Gallery</h1>
        <span>
          Local Storage
          <button
        className={`toggle ${isLocalStorage ? "active" : ""}`}
        onClick={() => setIsLocalStorage(!isLocalStorage)}
      >
        <span className="slider">  <FontAwesomeIcon icon={faPowerOff} /></span>
      </button>
        </span>
         
        <p><button onClick={() => {setTabIndex(tabIndex+1); FetchImagesfromLocalStorage(tabIndex+1);}}>Fetch Images</button></p>
        <> 
        
        <Card images={images} />
        <br/>
        <br/>
        {loading ?(<p>Loading...</p>):(<div style={{display:"flex",justifyContent:"center",gap:"10px"}}>      
        <button onClick={() => {if (tabIndex>0) {setTabIndex(tabIndex - 1);FetchImagesfromLocalStorage(tabIndex); }}}>Prev</button>
        <p>Tab Index: {tabIndex-1}</p>
        <button onClick={() => {isLocalStorage ?
         localStorage.getItem('items') ? 
         JSON.parse(localStorage.getItem('items')).length%1 : (<p>NA</p>)
        : setTabIndex(tabIndex + 1);FetchImagesfromLocalStorage(tabIndex); }}>Next</button>
        </div>)}
        
        </>  
       
        
    </div>
</>
  );
}