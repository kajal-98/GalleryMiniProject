import  react from 'react'
import axios from 'axios'

export default function Card(props) {
    console.log(props.images);
return (<div style={{ display:"flex",flexWrap:"wrap",justifyContent:"center",  gap: "10px" }}>
          {props.images.map((image) => (
            <img key={image.id} src={image.download_url} alt={image.title} style={{ width: "350px", height: "350px" }} />
          ))
          
          }
        </div>)}