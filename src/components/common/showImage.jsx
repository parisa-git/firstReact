import React from "react";
import Img from "react-image";
import ScaleLoader from "react-spinners";

const showImage = ({image}) => {
 return (
    <Img
        src={`https://toplearnapi.ghorbany.dev/${image}`
            // .'https://via.placeholder.com/150*100'
        }
        loader = {
            <div className="text-center mx-auto">
                <ScaleLoader loading={true} color={"#4A90E2"} />
            </div>
        }
    />
 )
}
 
export default showImage;