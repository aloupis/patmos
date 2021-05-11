import React,{useState,useRef} from 'react';

import axios from 'axios'

function App() {
  const inputRef = useRef(null);
const [media,setMedia] = useState([])


console.log({media})
  return (
    <div className="App">
      <input id="file" type="file" ref={inputRef} onChange={async (evt) => {
const formData = new FormData();
Array.from(evt.target.files).forEach((x) => {
  console.log({x});
  return formData.append('files', x, x.name);
});
formData.append('path','/images/1')

            const { data } = await axios({
              url: 'http://localhost:9000/upload',
              method: 'put',
              data: formData,
              headers:{"Content-Type" :"multipart/form-data" }
            });
        console.log({data})


      }}/>
      <button onClick={async ()=>{
        const formData = new FormData();
        formData.append('key','images/1')
                    const { data } = await axios({
                      url: 'http://localhost:9000/delete',
                      method: 'post',
                      data: formData,
                    });
                    console.log({data})
      }}>delete</button>

<button onClick={async ()=>{
    const formData = new FormData();
    formData.append('folder','images/1')
                    const { data } = await axios({
                      url: 'http://localhost:9000/files',
                      method: 'post',
                      data: formData,
                    });
                    const assets = JSON.parse(data)
                    setMedia(assets)
      }}>load</button>
      <div>
{media && media.filter(x=>x.resource_type==="image").map(x=><img key={x.public_id}style={{marginRight:'10px'}} alt={x.public_id} src={x.url} width="200" height="200"/>)}
</div>
    </div>
  );
}

export default App;
