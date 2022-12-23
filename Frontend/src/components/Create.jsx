import { useState } from "react";
// import {useHistory} from "react-router-dom"


const Create = () => {
    const [id,setId] = useState('')
    const [name,setNamed] = useState('');
    const [squaremeter,setSquareMeter] = useState('');
    const [grossrent,setGrossrent]=useState('')
    const [isPending,setIsPending] = useState(false);
    // const[picture,setPicture]= useState('')
 // const history = useHistory()
    const[image,setImage] = useState({})
   
 const fileOnChange = (event) =>{
    setImage(event.target.files[0])

 }
 const sendImage = (event) =>{
    let formData = new FormData();
formData.append("id",id)    
formData.append("name",name)
formData.append("squaremeter",squaremeter)
formData.append("grossrent",grossrent)
formData.append("picture", image)


// const test = {id,name, squaremeter, grossrent, picture}

    fetch("http://localhost:8000/houses",{
        method:"post",
        body: formData,
    }).then((res) =>res.text())
      .then((resBody) =>{
        console.log(resBody)
    })
 }



    const handleSubmit = (e)=>{
        e.preventDefault();
         let formData= new FormData()
        // formData.append('file','text')
        const blog = {id,name, squaremeter, grossrent, image}
        setIsPending(true)

    fetch('http://localhost:8000/houses',{
        method:'POST',
        // headers:{"Content-Type": "application/json"},
                // "Accept": "application/json"},
        // body: FormData
        body: formData
       }). then((res)=> {
        console.log('logsa')
        setIsPending(false)
        // history.go(-1);
        // history.push('/');
       })
    }

    return ( 
        <div className="create">
            <h2>Add a new Rent</h2>
        {/* <input type="file" name="picture" required  onChange={fileOnChange}  />
        <button onClick={sendImage}>Upload</button> */}


            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setNamed(e.target.value)}
                />
                <label>squareMeter:</label>
                <input
                    type="number"
                    required
                    value={squaremeter}
                    onChange={(e) => setSquareMeter(e.target.value)}
                />
                <label>grossrent:</label>
                 <input
                    type="number"
                    required
                    value={grossrent}
                    onChange={(e) => setGrossrent(e.target.value)}
                />
                {/* <input 
                type="file" 
                name="picture" 
                required
                value={picture}
                onChange={(e) => setPicture(e.target.value)}
                /> */}
                        <input type="file" name="picture" required  onChange={fileOnChange}  />
                {!isPending &&  <button onClick={sendImage}>Upload rent</button>}  
                {isPending && <button  disabled>Uploaded rent</button>}              
                {/* { !isPending && <button>Add rent</button>}
                { isPending && <button disabled>Adding rent...</button>} */}
                {/* <p>{name}</p>
                <p>{squaremeter}</p> */}
            </form>
        </div>
     );
}
 
export default Create;