import "./stylez.css"
function StreamCard(props){

    return( 
        

        <div className="card m-2 ">

        <div className="imgBox">
          <img src="https://wac-cdn.atlassian.com/fr/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=309" alt="mouse corsair" class="mouse"/>
        </div>
      
        <div className="contentBox">
          <h3>Streamer</h3>
          <h2 className="price">61.<small>98</small> €</h2>
          <a href="#" className="buy">Buy Now</a>
        </div>
      
      </div>)
}

export default StreamCard;