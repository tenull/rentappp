import { useState } from "react";
// import {useHistory} from "react-router-dom"


const Create = () => {
    const [id, setId] = useState('')
    const [name, setNamed] = useState('');
    const [squaremeter, setSquareMeter] = useState('');
    const [grossrent, setGrossrent] = useState('')
    const [isPending, setIsPending] = useState(false);
    const [text, setText] = useState('')
    const [counter, setCounter] = useState(0);
    const [counterKitchen, setCounterKitchen] = useState(0)
    const [counterBathroom, setCounterBathroom] = useState(0)
    const [bedroom, setBedroom] = useState('')
    const [kitchen, setKitchen] = useState('')
    const [bathroom, setBathroom] = useState('')

    const increase = () => {
        setCounter(count => count + 1);

    };
    const increaseKitchen = () => {
        setCounterKitchen(count => count + 1)
    }
    const increaseBathroom = () => {
        setCounterBathroom(count => count + 1)
    }


    const decrease = () => {
        setCounter(count => count - 1);
    };
    const decreaseKithcen = () => {
        setCounterKitchen(count => count - 1)
    };
    const decreaseBathroom = () => {
        setCounterBathroom(count => count - 1)
    };


    const reset = () => {
        setCounter(0)

    }

    const resetKitchen = () => {
        setCounterKitchen(0)
    }
    const resetBathroom = () => {
        setCounterBathroom(0)

    }


    const [image, setImage] = useState({})

    const fileOnChange = (event) => {
        setImage(event.target.files[0])

    }
    const sendImage = (event) => {
        let formData = new FormData();
        formData.append("id", id)
        formData.append("name", name)
        formData.append("text", text)
        formData.append("bedroom", counter)
        formData.append("kitchen", counterKitchen)
        formData.append("bathroom", counterBathroom)
        formData.append("squaremeter", squaremeter)
        formData.append("grossrent", grossrent)
        formData.append("picture", image)



        fetch("http://localhost:8000/houses", {
            method: "post",
            body: formData,
        }).then((res) => res.text())
            .then((resBody) => {
                console.log(resBody)
            })
    }



    const handleSubmit = (e) => {
        e.preventDefault();
        let formData = new FormData()

        setIsPending(true)

        fetch('http://localhost:8000/houses', {
            method: 'POST',
            body: formData
        }).then((res) => {
            console.log('logsa')
            setIsPending(false)
            // history.go(-1);
            // history.push('/');
        })
    }

    return (
        <div className="create-main">

            <h2>Add a new Rent</h2>
            <div className="create">
                <div className="create-container">
                    <form onSubmit={handleSubmit}>
                        <div className="test">
                            <div className="main-information">
                                <div>
                                    <label>Name:</label>
                                    <input
                                        type="text"
                                        required
                                        value={name}
                                        onChange={(e) => setNamed(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label>squareMeter:</label>
                                    <input
                                        type="number"
                                        required
                                        value={squaremeter}
                                        onChange={(e) => setSquareMeter(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label>grossrent:</label>
                                    <input
                                        type="number"
                                        required
                                        value={grossrent}
                                        onChange={(e) => setGrossrent(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="counter2">
                                <div className="counter">
                                    <label>Number of bedroom</label>

                                    <div className="btn__container">
                                        <button className="control__btn" onClick={decrease}>-</button>
                                        <span className="counter__output" value={bedroom} onChange={(e) => setBedroom(e.target.value)}>{counter}</span>

                                        <button className="control__btn" onClick={increase}>+</button>
                                        <button className="reset" onClick={reset}>Reset</button>
                                    </div>


                                </div>

                                <div className="counter">
                                    <label>Number of kitchen</label>

                                    <div className="btn__container">
                                        <button className="control__btn" onClick={decreaseKithcen}>-</button>
                                        <span className="counter__output" value={kitchen} onChange={(e) => setKitchen(e.target.value)}>{counterKitchen}</span>
                                        <button className="control__btn" onClick={increaseKitchen}>+</button>
                                        <button className="reset" onClick={resetKitchen}>Reset</button>
                                    </div>
                                </div>
                                <div className="counter">
                                    <label>Number of bathroom</label>

                                    <div className="btn__container">
                                        <button className="control__btn" onClick={decreaseBathroom}>-</button>
                                        <span className="counter__output" value={bathroom} onChange={(e) => setBathroom(e.target.value)}>{counterBathroom}</span>
                                        <button className="control__btn" onClick={increaseBathroom}>+</button>
                                        <button className="reset" onClick={resetBathroom}>Reset</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="about-thehouse">

                            <label>About the house:</label>
                            <textarea
                                className="rent-text"
                                required
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                            ></textarea>
                        </div>
                        <div className="upload">
                            <input type="file" name="picture" required onChange={fileOnChange} />
                            {!isPending && <button onClick={sendImage}>Upload rent</button>}
                            {isPending && <button disabled>Uploaded rent</button>}
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}

export default Create;