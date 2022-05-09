import {
  Box,
  Button,
  Chip,
  InputAdornment,
  TextField,
} from "@material-ui/core";
import { Keyboard } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import useResponsiveSize from "../utils/useResponsiveSize";
import axios from "axios";

export function MeetingDetailsScreen({ onClickJoin, onClickCreateMeeting }) {
  const queryParams = new URLSearchParams(window.location.search);
  const [meetingId, setMeetingId] = useState(queryParams.get("meetId"));
  const [meetingIdError, setMeetingIdError] = useState(false);
  const padding = useResponsiveSize({
    xl: 6,
    lg: 6,
    md: 6,
    sm: 4,
    xs: 1.5,
  });
  const visib = () => {
    if (meetingId == "create") return false;
    return true;
  };

  const [buttonvisib, setButtonvisib] = useState(visib);
  const [streamtitle, setStreamTitle] = useState("");
  const [imgsrc, setImgsrc] = useState(process.env.PUBLIC_URL+"/images/Streams/aaa.jpg");
  function sleep(time){
    return new Promise((resolve)=>setTimeout(resolve,time)
  )
}
  const imgClicked = (e) => {
    e.preventDefault();
    document.getElementById("file-input").click();
  };
  const onInputChange = (e) => {
    const formData = new FormData();
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const stname=queryParams.get("streamerName").replace(/ /g,"_")
    const imgname =
      stname +
      "_" +
      localStorage.getItem("streamtitle");

    formData.append("username", imgname);
    formData.append("photo", e.target.files[0]);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    // axios
    //   .post(BASE_URL+"user/uploadProfileImg", formData, config)
    //   .then();
    

      axios
      .post(BASE_URL+"stream/uploadStreamImg", formData, config).then(
        
      )
      sleep(1000).then(()=>{
        setImgsrc(process.env.PUBLIC_URL+"/images/Streams/"+imgname+".jpg")
     })
      
  };
  

  useEffect(() => {
    console.log(streamtitle);
    localStorage.setItem("streamtitle", streamtitle);
  }, [streamtitle]);
  return (
    <Box
      m={6}
      style={{
        display: "flex",
        flex: 1,
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: padding,
      }}
    >
      <div hidden={buttonvisib}>
        <span style={{ color: "white" }}>stream title</span>{" "}
        <input
          type="text"
          value={streamtitle}
          onChange={(e) => setStreamTitle(e.target.value)}
        ></input>
        <br></br>
        <input
          type="file"
          id="file-input"
          style={{ overflow: "hidden", height: "0px", width: "0px" }}
          accept="image/*"
          onChange={onInputChange}
        ></input>
        <a onClick={imgClicked} className="file-upload">
          {" "}
          <img
            id="profileimg"
            alt="khraaa"
            className="img-fluid rounded-circle  "
            src={imgsrc}
            style={{
              "margin-left": "5rem",
              "margin-bottom": "15%",
              width: "40%",
            }}
          />{" "}
        </a>
        <Button
          style={{
            marginBottom: "1rem",
          }}
          color="primary"
          variant="contained"
          onClick={(e) => {
            onClickCreateMeeting();
          }}
        >
          Create Meeting
        </Button>
      </div>

      <div hidden={!buttonvisib}>
        <TextField
          disabled
          fullwidth
          style={{
            marginTop: "1rem",
            width: "100%",
          }}
          required
          id="outlined"
          label="Meeting ID"
          helperText={meetingIdError ? "Meeting id is not valid" : ""}
          onChange={(e) => {
            setMeetingId(e.target.value);
          }}
          error={meetingIdError}
          variant="outlined"
          defaultValue={meetingId}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Keyboard />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <Button
                  disabled={!meetingId.match("\\w{4}\\-\\w{4}\\-\\w{4}")}
                  color="primary"
                  variant="contained"
                  onClick={(e) => {
                    if (meetingId.match("\\w{4}\\-\\w{4}\\-\\w{4}"))
                    { onClickJoin(meetingId);
                      }
                    else setMeetingIdError(true);
                  }}
                  id={"btnJoin"}
                >
                  Join
                </Button>
              </InputAdornment>
            ),
          }}
        />
      </div>
    </Box>
  );
}