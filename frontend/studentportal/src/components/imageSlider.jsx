import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box } from "@mui/material"; // Agar MUI use kar rahe hain, warna simple div bhi chalega

const images = [
  "/images/homePageImg1.jpg",
  "/images/homePageImg2.jpg",
  "/images/homePageImg3.jpg",
  "/images/homePageImg4.jpg",
];

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  arrows: true
};

function HeroSlider() {
  return (
    /* 1. Main Wrapper: Isko humne 100vh height di hai aur flex center kiya hai */
    <Box 
      sx={{ 
        width: "100%", 
        height: "90vh", // Puri screen ki height
        display: "flex", 
        marginTop : "64px",
        flexDirection: "column",
        justifyContent: "center", // Vertically center karega
        overflow: "hidden",
        bgcolor: "#f0f0f0" // Optional: Background color check karne ke liye
      }}
    >
      <Slider {...settings}>
        {images.map((img, i) => (
          <div key={i}>
            <img
              src={img}
              style={{ 
                width: "100%", 
                height: "80vh", // Slider ki apni height thori kam rakhi hai taake centering nazar aaye
                objectFit: "cover" 
              }}
              alt={`slide-${i}`}
            />
          </div>
        ))}
      </Slider>
    </Box>
  );
}

export default HeroSlider;