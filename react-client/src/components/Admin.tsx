const mongoose = require('mongoose');



const db = mongoose.collection("users")

export default function Admin(){
    
    const handleSubmit = async e => {
        e.preventDefault();
        const cursor = db.find();
        await cursor.forEach(console.log);
    }

    return(
    <>
        <button onClick={handleSubmit}> Clear all BlogPosts</button>
    
    </>
    );

}