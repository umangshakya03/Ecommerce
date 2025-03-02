import React, { useEffect, useState, useContext } from "react";
import Rating from "@mui/material/Rating";
import { Input, IconButton, Typography } from "@material-tailwind/react";
import Minus from "../assets/Public/minus.svg";
import Plus from "../assets/Public/plus.svg";
import Button from "@mui/material/Button";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { useProductRating } from "../custom-hooks/useProductRating";
import { Box, Modal } from "@mui/material";
import ReactMarkdown from "react-markdown";
import { useCart } from "../context/CartContext";
import SessionContext from "./../context/SessionContext";
import SnackbarComponent from "../components/SnackBarComponent";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: { xs: 1, sm: 2 },
  width: {
    xs: "95vw",
    sm: "85vw",
    md: "75vw",
    lg: "65vw",
  },
  height: {
    xs: "80vh",
    sm: "85vh",
    md: "90vh",
  },
  overflow: "auto",
  outline: "none",
  borderRadius: 1,
};

const ProductOverview = ({ data, onRatingUpdate }) => {
  const [imageOpen, setImageOpen] = useState(false);
  const [value, setValue] = useState(1);
  const {
    name,
    price,
    rating: initialRating,
    ratingCount: initialRatingCount,
    id,
    description,
    image,
    discount,
    discountedPrice,
  } = data;

  const {
    rating: currentRating,
    ratingCount,
    handleRating,
  } = useProductRating(id, initialRating, initialRatingCount, onRatingUpdate);

  const { session } = useContext(SessionContext);
  const { dispatch } = useCart();
  const { setErrorHandler } = useContext(SessionContext);

  const handleQuantityChange = (newValue) => {
    const validValue = Math.max(1, Number(newValue) || 1);
    setValue(validValue);
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value === "" ? 1 : Number(e.target.value);
    handleQuantityChange(newValue);
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();
    try {
      const requestBody = {
        productId: data.id,
        quantity: value,
        userId: session?.user?.id,
      };

      const response = await fetch("/server/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(requestBody),
      });

      const responseData = await response.json();

      setErrorHandler({
        isSnackbarOpen: true,
        snackbarMessage: "Added product to cart.",
        alertColor: "success",
      });

      if (!response.ok) {
        throw new Error(
          responseData.error || `HTTP error! status: ${response.status}`
        );
      }

      dispatch({ type: "ADD_ITEM", payload: responseData });
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  return (
    // Container
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 bg-white">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 bg-gray-50 rounded-modern shadow-modern-lg p-6">
        {/* left image */}
        <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[670px] lg:w-1/2 bg-white rounded-modern shadow-modern p-4">
          <Swiper
            navigation
            pagination={{ clickable: true }}
            modules={[Navigation, Pagination]}
            className="rounded-lg h-full"
          >
            {image.map((src, index) => (
              <SwiperSlide
                key={index}
                className="flex items-center justify-center"
              >
                <div className="w-full h-full flex items-center justify-center">
                  <img
                    src={`/server/api/upload/image/${src}`}
                    alt={`Product image ${index + 1}`}
                    className="max-w-full max-h-full object-contain cursor-pointer"
                    onClick={() => setImageOpen(true)}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* IMAGE ZOOM MODAL */}
        <Modal
          open={imageOpen}
          onClose={() => setImageOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Swiper
              navigation
              pagination={{ clickable: true }}
              modules={[Navigation, Pagination]}
              className="rounded-lg w-full h-full"
            >
              {image.map((src, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={`/server/api/upload/image/${src}`}
                    alt={`Product image ${index + 1}`}
                    className="w-full h-full object-contain"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
        </Modal>
        {/* right side */}
        <div className="w-full lg:w-1/2 flex flex-col bg-white rounded-modern shadow-modern p-6">
          {/* Product name */}
          <h1 className="text-xl sm:text-3xl font-bold mb-2 sm:mb-4 text-primary-900">
            {name}
          </h1>
          {/* Rating number */}
          <div className="flex items-center mb-2 sm:mb-4 gap-1">
            <Rating
              name="half-rating"
              value={currentRating}
              precision={0.5}
              onChange={handleRating}
              size="small"
              className="sm:scale-100 scale-90"
            />
            <p className="text-sm sm:text-base text-secondary-600">
              ({ratingCount})
            </p>
          </div>
          {/* Price number */}
          {discount ? (
            <div className="flex mb-4">
              <p className="mr-2 font-semibold text-primary-600 text-lg sm:text-xl">
                {discountedPrice.toFixed(2)}₹
              </p>
              <p className="font-semibold line-through text-red-800 text-sm sm:text-base">
                {price.toFixed(2)}₹
              </p>
            </div>
          ) : (
            <div className="flex mb-4">
              <p className="font-semibold text-primary-600 text-lg sm:text-xl">
                {price.toFixed(2)}₹
              </p>
            </div>
          )}

          <div className="mb-4 sm:mb-6">
            {/* Description */}
            <div className="text-secondary-600 max-h-48 sm:max-h-96 overflow-y-auto prose prose-sm bg-gray-50 rounded-modern p-4 shadow-modern">
              <ReactMarkdown>{description}</ReactMarkdown>
            </div>
          </div>

          <div className="flex flex-col w-full sm:w-4/5 gap-4 mt-auto">
            <div className="flex justify-center gap-4">
              <Button
                size="sm"
                className="rounded-lg min-w-[40px] bg-primary-50 hover:bg-primary-100"
                onClick={() => handleQuantityChange(value - 1)}
              >
                <img
                  src={Minus}
                  alt="minus image"
                  className="size-4"
                  style={{ cursor: "pointer" }}
                />
              </Button>
              <Input
                type="number"
                value={value}
                onChange={handleInputChange}
                className="border border-primary-200 !w-16 sm:!w-20 text-center pb-4 rounded-lg"
                containerProps={{
                  className: "min-w-[64px] text-center",
                }}
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                style={{
                  height: "40px",
                }}
                variant="static"
                crossOrigin={undefined}
                inputMode="numeric"
                min={1}
                pattern="[0-9]*"
              />
              <Button
                size="sm"
                className="rounded-lg min-w-[40px] bg-primary-50 hover:bg-primary-100"
                onClick={() => handleQuantityChange(value + 1)}
              >
                <img
                  src={Plus}
                  alt="plus image"
                  className="size-4"
                  style={{ cursor: "pointer" }}
                />
              </Button>
            </div>
            <button
              className="w-full rounded-modern bg-primary-600 p-3 sm:p-4 text-white text-sm font-medium transition transform hover:-translate-y-0.5 hover:bg-primary-700"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductOverview;
