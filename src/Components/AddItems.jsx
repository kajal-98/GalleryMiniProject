import react from 'react'
import { Navbar } from './Navbar';

export function AddItems() {
    const [id, setId] = react.useState(localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')).length + 1 : 1);
    const[title, setTitle] = react.useState('');
    const[download_url, setDownloadUrl] = react.useState('');
    const[itemType, setItemType] = react.useState('image');
    const[storage, setStorage] = react.useState([]);

    function handleSubmit(e) {
        e.preventDefault(); 
        // Handle form submission logic here

        console.log('Id:', id);
        console.log('Title:', title);
        console.log('Download URL:', download_url);
        console.log('Item Type:', itemType);    
        setStorage([...storage, { id, title, download_url, itemType }]);
        localStorage.setItem('items', JSON.stringify([...storage, { id, title, download_url, itemType }]));
        setId(id + 1);
        setTitle('');
        setDownloadUrl('');
        setItemType('image');
    }

  return (
    <>
    <Navbar />
    <div>
      <h1>Add Items Page</h1>
      <p>This is the add items page of the gallery mini project.</p>
    </div>
    <div>
        <form onSubmit={handleSubmit}>
            <input type ="text" placeholder="Id" value={id}  disabled/>
            <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <input type="text" placeholder="Download URL" value={download_url} onChange={(e) => setDownloadUrl(e.target.value)} />
            <input type="radio" name="itemType" value="image" checked={itemType === 'image'} onChange={(e) => setItemType(e.target.value)} />
            <label htmlFor="image">Image</label>
            <input type="radio" name="itemType" value="video" checked={itemType === 'video'} onChange={(e) => setItemType(e.target.value)} />
            <label htmlFor="video">Video</label>
            <button type="submit">Add Item</button>
        </form>
    </div>
    </>
  );
}