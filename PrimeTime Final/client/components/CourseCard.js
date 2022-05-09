import "./stylez.css"
function CourseCard(course){

   console.log(course.course)
    return( 


        <div className="cardd m-3">
          <a href={"/courses/"+course.course._id}>
        <div className="imgBoxx">
          <img src={"/images/users/"+course.course.teachers[0]+".jpg"} alt="mouse corsair" class="mousee"/>
        </div>

        <div className="contentBoxx">
          <h3>{course.course.name}</h3>
          <h2 className="pricee">{course.course.type}</h2>
          <a href="#" className="buyy">Buy Now</a>
        </div>
        </a>
      </div>

      )
}

export default CourseCard;