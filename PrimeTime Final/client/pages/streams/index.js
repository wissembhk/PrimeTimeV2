import React, { useEffect, useState } from "react";
import Layout from "../../containers/common/common-layout";
import StreamCard from "./streamCard";
import axios from "axios";
import Pagination from "../../utils/Pagination";
import { BASE_URL } from "../../constant/constants";

const PortfolioTitle4Col = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [streamsPerPage, setStreamsPerPage] = useState(12);
  const indexOfLastStream = currentPage * streamsPerPage;
  const indexOfFirstStream = indexOfLastStream - streamsPerPage;
  const [streams, setStreams] = useState([]);
  const currentStreams = streams.slice(indexOfFirstStream, indexOfLastStream);

  const searchStrams = async (e) => {
    let searchedStreams = [...streams];
    
if(e!="")
    searchedStreams = searchedStreams.filter((elem) => {
      return elem.firstname.toLowerCase().search(e.toLowerCase())!==-1  || elem.lastname.toLowerCase() == e.toLowerCase()|| elem.role.toLowerCase() == e.toLowerCase();
    });
    else{getStreams()
    }

    console.log("result:", searchedStreams);
    setStreams(searchedStreams)
  };

  const getStreams = async () =>
    axios
      .get(BASE_URL+"user/getStreamers")
      .then((res) => {
        setStreams(res.data);
      })
      .catch(function (error) {
        console.log(error.response.data);
      });

  useEffect(() => {
    getStreams();
  }, []);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <Layout
      pathList={["streams", "channels"]}
      pathTitle="channels"
     
    >

      
      <div className="w-100">
  <center> <input onChange={(event) => searchStrams(event.target.value)} className="mt-3 mr-2"  ></input>
  <svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16" >
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
</svg> 
</center>
   </div>
    
      <StreamCard
        className="col-lg-3 col-md-4 col-sm-6 isotopeSelector"
        title="elyes"
        subTitle="Lorem Ipsum"
        streams={currentStreams}
      />
      <Pagination
        streamsPerPage={streamsPerPage}
        totalStreams={streams.length}
        paginate={paginate}
        currentpage={currentPage}
      ></Pagination>
    </Layout>
  );
};

export default PortfolioTitle4Col;