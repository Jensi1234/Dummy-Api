import Navbar from './Navbar';
import './Post.css'

const Post = () => {

    async function post() {
        try {
            let postData = await fetch('https://dummyjson.com/posts')
            let data = await postData.json()
            console.log(data)
        } catch (e) {
            console.log('error', e)
        }
    }
    post();


    return (
        <>
            <Navbar />
            <div className='post-container'>
                <div class="card">
                    <div class="card-header">
                        Featured
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">Special title treatment</h5>
                        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
            </div>
        </>
    )

}

export default Post;