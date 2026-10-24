import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import Card from './Card';
import { Navbar } from './Navbar';

export function GalleryInfiniteScroll() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);


const PAGE_SIZE = 10;


  const fetchMoreData = async () => {
      console.log("FETCH CALLED — page:", page);

    try {

        const axiosresponse = await axios.get(`https://picsum.photos/v2/list?page=${page}&limit=${PAGE_SIZE}`);    
        // setItems(prev => [...prev, ...axiosresponse.data]);

            console.log("API RESPONSE — page:", page);


        if (axiosresponse.data.length === 0) {
        setHasMore(false);
        return;
      }
      
      setItems(prev => [...prev, ...axiosresponse.data]);
      setPage(prevPage => prevPage + 1);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
    <Navbar />
    <div style={{ maxWidth: '100%', margin: '0 auto', padding: '20px' }}>
      <h1>Infinite Scroll Library</h1>
      
      <InfiniteScroll
        dataLength={items.length} // Imperative for tracking length changes
        next={fetchMoreData}       // Function called when the user hits the bottom
        hasMore={hasMore}         // Determines if it should keep listening for scrolls
        loader={<h4>Loading...</h4>} 
        endMessage={<p>You have seen it all!</p>}
      >
       <Card images={items} />
      </InfiniteScroll>
    </div>
    </>
  );
}
