import React from 'react'
import "./Home1.css";
import Nav from '../narbar/Nav';
import Sitebar from '../sitebar/Sitebar';
import { useNavigate } from 'react-router-dom'

function Home1() {

    const navigate = useNavigate();
    return (
        <>

            <div class="main">
                <div id="home">
                    <Nav />

                    <div class="home-hero">
                        <div class="hero-text">
                            <p>New Generation</p>
                            <h1>Shop <span>Local</span> Live <span>Better</span></h1>
                            {/* <h1>Live <span>Better</span></h1> */}
                            <h1>Your <span>Neighborhood </span>Store Just A <span>Click</span> Away</h1>
                            <button onClick={() => navigate("/shoping/signin")}>Get Started</button>
                        </div>
                        <div class="hero-image">

                            <lottie-player src="https://lottie.host/ea591eaa-4693-436c-9b3f-d4f47a56b07b/1wxjy6UsH1.json" background="trnsparent" speed="1" style={{ width: "80%", height: "70%" }} loop autoplay direction="1" mode="normal"></lottie-player>
                            {/* <dotlottie-player src="https://lottie.host/2707de76-e100-48a6-92e4-4ef4cf41c725/4mvilbwGKO.json" background="transparent" speed="1" style={{width:"100%",height: "100%"}} loop autoplay></dotlottie-player> */}
                        </div>
                    </div>
                </div>
                <div class="features">
                    <div class="feature-text">
                        <h1>Smart Shopping:Value,Ease,and Satisfaction</h1>
                        <p>At Local Store, we combine market insights, effortless shopping, and a commitment to your satisfaction. Discover a seamless shopping experience tailored to your needs</p>
                    </div>
                    <div class="feature-style">
                        <div class="box">
                            <div class="icon"><i class="fa-solid fa-shop"></i></div>
                            <div class="icon-text">
                                <h3>Market Analysis</h3>
                                <p>"Understanding what you need before you even know it! At Local Store, we keep our finger on the pulse of the market, ensuring the best products at competitive prices"</p>
                            </div>
                        </div>
                        <div class="box">
                            <div class="icon"><i class="fa-solid fa-bag-shopping"></i></div>
                            <h3>Easy Purchase</h3>
                            <p>"Shopping made effortless! With a simple interface and smooth checkout process, we’ve made it easy for you to get what you need in just a few clicks"</p>
                        </div>
                        <div class="box">
                            <div class="icon"><i class="fa-solid fa-face-smile"></i></div>
                            <h3>100% Satistified</h3>
                            <p>"Your happiness is our guarantee! We’re committed to delivering quality products with unmatched service. If you’re not 100% satisfied, we’re not either—because your satisfaction is our success"</p>
                        </div>

                    </div>
                </div>
                <div className="selling">
                    <div className="selling-text">
                        <h1>Best Selling Products</h1>
                        <img src="https://websitedemos.net/organic-shop-02/wp-content/uploads/sites/465/2019/07/logo-leaf-new.png" alt="#" />
                    </div>
                    <div className="selling-style">
                        <div className="selling-box">
                            <img src="https://m.economictimes.com/thumb/msid-95679392,width-1200,height-900,resizemode-4,imgsize-60796/almonds-.jpg" alt="Almonds" />
                            <div className="details">
                                <p>Nuts</p>
                                <h3>Almonds</h3>
                            </div>
                        </div>
                        <div className="selling-box">
                            <img src="https://www.moglix.com/blog/wp-content/uploads/2020/05/hand-sentizers.jpg" alt="Sanitizer Picture" />
                            <div className="details">
                                <p>Curing</p>
                                <h3>Sanitizer</h3>
                            </div>
                        </div>
                        <div className="selling-box">
                            <img src="data:image/jpeg;base64,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" alt="Mustard Oil Picture " />
                            <div className="details">
                                <p>Oil</p>
                                <h3>Mustard Oil</h3>
                            </div>
                        </div>
                        <div className="selling-box">
                            <img src="https://i.pinimg.com/736x/dd/ef/9a/ddef9aa1c9c4ef5250cf634b64d8822d.jpg" alt="Red Chilli Picture" />
                            <div className="details">
                                <p>Spices</p>
                                <h3>Kashmiri Red Chilies</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="feed">
                    <div className="feedback">
                        <div className="feedback-text"> <h1>Customers Reviews</h1></div>
                        <div className="feedback-style">
                            <div className="reviews-box">
                                <div className="star">
                                    <i className="fa-solid fa-star"> </i>
                                    <i className="fa-solid fa-star"> </i>
                                    <i className="fa-solid fa-star"> </i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-regular fa-star-half-stroke"></i>
                                </div>
                                <div className="customer-text">
                                    <p>“I was impressed by how easy it was to find exactly what I needed. The checkout was quick, and my order arrived right on time. Definitely my go-to store now!” </p>
                                    <h5>-Dev P</h5>
                                </div>
                            </div>
                            <div className="reviews-box">
                                <div className="star">
                                    <i className="fa-solid fa-star"> </i>
                                    <i className="fa-solid fa-star"> </i>
                                    <i className="fa-solid fa-star"> </i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-regular fa-star-half-stroke"></i>
                                </div>
                                <div className="customer-text">
                                    <p>“Local Store has everything! From essentials to specialty items, I’m always able to find what I need at great prices. Highly recommend!”</p>
                                    <h5>-Shreyas T</h5>
                                </div>
                            </div>
                            <div className="reviews-box">
                                <div className="star">
                                    <i className="fa-solid fa-star"> </i>
                                    <i className="fa-solid fa-star"> </i>
                                    <i className="fa-solid fa-star"> </i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-regular fa-star-half-stroke"></i>
                                </div>
                                <div className="customer-text">
                                    <p>“I’ve never had a smoother shopping experience. The customer service is top-notch, and the products are always high quality. Very satisfied!”</p>
                                    <h5>-Priya M</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <footer>
                    <div className="ft-text">&copy; 2024 <i class="fa-sharp fa-regular fa-copyright"></i> All rights reserved | made with <i class="fa-sharp fa-solid fa-heart" id="heart"></i> by team by Clg</div>
                </footer>
            </div>





        </>
    )
}

export default Home1