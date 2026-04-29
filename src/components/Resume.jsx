import { useState, useRef, useEffect } from "react";
import { Button, Card} from "react-bootstrap";
import pdf from '../Kendall_Scholly_Resume.pdf';

function Resume(){
return <div style={{ width: "500px", flexShrink: 0 }}>
    <h2 className="about-section-heading">My Resume</h2>
     <div style={{ height: '100vh' }}>
      <embed 
        src={pdf} 
        type="application/pdf" 
        width="100%" 
        height="55%" 
      />
    </div>
  </div>
}
export default Resume;