import { useState } from "react";
import { Modal, Box, Rating } from "@mui/material";
import PropTypes from "prop-types";
import ProductOverview from "./ProductOverview";
import { useProductRating } from "../custom-hooks/useProductRating";
import { useCart } from "../context/CartContext";
import { formatIndianPrice } from "../utils/formatCurrency";

ProductCard.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number,
    ratingCount: PropTypes.number,
    id: PropTypes.number.isRequired,
    discount: PropTypes.number,
    image: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  onRatingUpdate: PropTypes.func.isRequired,
  toggleWishList: PropTypes.func.isRequired,
  isInWishList: PropTypes.func.isRequired,
  imageHeight: PropTypes.string,
  containerStyles: PropTypes.string,
  imageStyles: PropTypes.string,
  contentStyles: PropTypes.string,
};

export default function ProductCard({
  data,
  onRatingUpdate,
  toggleWishList,
  isInWishList,
  imageHeight = "h-72 sm:h-80",
  containerStyles = "",
  imageStyles = "",
  contentStyles = "",
}) {
  const [open, setOpen] = useState(false);
  const {
    name,
    price,
    rating: initialRating,
    ratingCount: initialRatingCount,
    id,
    discount,
    image,
  } = data;

  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { dispatch } = useCart();
  const discountedPrice = price * (1 - (discount || 0) / 100);

  const {
    rating: currentRating,
    ratingCount,
    handleRating,
  } = useProductRating(id, initialRating, initialRatingCount, onRatingUpdate);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const isWishlisted = isInWishList(id);

  const handleWishlistClick = (event) => {
    event.preventDefault();
    toggleWishList(data);
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();
    if (isAddingToCart) return;

    try {
      setIsAddingToCart(true);
      const response = await fetch("/server/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          productId: id,
          quantity: 1,
        }),
      });

      const responseData = await response.json();
      if (!response.ok)
        throw new Error(
          responseData.error || `HTTP error! status: ${response.status}`
        );
      dispatch({ type: "ADD_ITEM", payload: responseData });
    } catch (error) {
      console.error("Error adding product to cart:", error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <div className={`group relative ${containerStyles}`}>
      {/* Product Image */}
      <div
        onClick={handleOpen}
        className="cursor-pointer overflow-hidden rounded-modern-sm bg-gray-50"
      >
        <img
          src={`/server/api/upload/image/${image[0]}`}
          alt={name}
          className={`w-full object-cover transition duration-300 group-hover:scale-105 ${imageHeight} ${imageStyles}`}
        />
      </div>

      {/* Product Info */}
      <div className={`mt-4 space-y-2 ${contentStyles}`}>
        {discount > 0 && (
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-accent-50 px-2 py-1 text-xs font-medium text-accent-600 ring-1 ring-inset ring-accent-500/20">
              {discount}% OFF
            </span>
          </div>
        )}

        <h3
          onClick={handleOpen}
          className="cursor-pointer text-lg font-medium text-secondary-900 transition-colors group-hover:text-primary-600"
        >
          {name}
        </h3>

        <div className="flex items-end gap-2">
          <p className="text-xl font-bold text-secondary-900">
            {formatIndianPrice(discountedPrice)}
          </p>
          {discount > 0 && (
            <p className="text-sm text-secondary-500 line-through">
              {formatIndianPrice(price)}
            </p>
          )}
        </div>

        <div className="flex items-center gap-1">
          <Rating
            name={`rating-${id}`}
            value={currentRating}
            precision={0.5}
            onChange={handleRating}
            size="small"
          />
          <span className="text-sm text-secondary-500">({ratingCount})</span>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={isAddingToCart}
          className="w-full rounded-modern-sm bg-primary-600 px-4 py-3 text-sm font-medium text-white shadow-sm transition-all hover:bg-primary-700 hover:shadow-md disabled:cursor-wait disabled:bg-primary-300"
        >
          {isAddingToCart ? "Adding..." : "Add to Cart"}
        </button>
      </div>

      {/* Product Overview Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="product-modal-title"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "95vw", sm: "85vw", md: "75vw", lg: "65vw" },
            height: { xs: "80vh", sm: "85vh", md: "90vh" },
            bgcolor: "background.paper",
            boxShadow: 24,
            p: { xs: 2, sm: 3 },
            overflow: "auto",
            borderRadius: 1,
          }}
        >
          <ProductOverview
            data={{
              ...data,
              rating: currentRating,
              ratingCount: ratingCount,
              discountedPrice: discountedPrice,
            }}
            onRatingUpdate={onRatingUpdate}
          />
        </Box>
      </Modal>
    </div>
  );
}
