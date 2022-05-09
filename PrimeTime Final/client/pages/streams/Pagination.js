import React from "react";

const Pagination= ({streamsPerPage,totalStreams,paginate,currentpage}) =>{

    const pageNumbers=[];
    for(let i=1;i<=Math.ceil(totalStreams/streamsPerPage);i++)
    {
        pageNumbers.push(i);
    }
    const compare = (a,b) =>{ if(a==b) return "active cdp_i"; return "cdp_i"} 
    const prev=()=>{if(currentpage-1>0)paginate(currentpage-1)}
    const next=()=>{if(currentpage+1<=Math.ceil(totalStreams/streamsPerPage))paginate(currentpage+1)}
    return (
        <div className="pagination_sec mb-5">
        <div className="content_detail__pagination cdp">
            <ul>
            <li><a className="prev" onClick={prev} href="#"><i aria-hidden="true" className="fa fa-angle-double-left"></i></a></li>
                {pageNumbers.map(number=>(
                    
                         <li key={number}>
                             
                             <a  onClick={()=>paginate(number)} className={compare(number,currentpage)} href="#">{number}</a>
                        </li>
                ))}
                
               
               
                <li><a className="next" onClick={next} href="#"><i aria-hidden="true" className="fa fa-angle-double-right"></i></a></li>
            </ul>
        </div>
    </div>
    )
}

export default Pagination;
