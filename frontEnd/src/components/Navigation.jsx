import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Box } from "@mui/material";
import ModalLogin from "./ModalLogin";
import Logout from "./Logout";
import ShoppingCartModal from "./ShoppingCartModal";
import SearchComponent from "./SearchComponent";
import { useCart } from "../context/CartContext";

export default function Nav() {
  const [openShopingCartModal, setOpenShopingCartModal] = useState(false);
  const { state } = useCart();

  const totalItems = useMemo(() => {
    return state?.items?.reduce((total, item) => total + item.quantity, 0) || 0;
  }, [state.items]);

  const handleOpen = () => setOpenShopingCartModal(true);
  const handleClose = () => setOpenShopingCartModal(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center py-4 animate-fade-in">
          <div className="w-full md:w-auto flex justify-between items-center">
            <Link to="/" className="flex items-center gap-2 group">
              {/* Replace with phone case icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-8 md:size-10 text-primary-600 group-hover:text-primary-500 transition-colors"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                <path d="M12 18h.01" />
              </svg>
              <span className="text-xl font-bold text-primary-600 group-hover:text-primary-500 transition-colors">
                CaseCraft
              </span>
            </Link>

            <button className="md:hidden relative group" onClick={handleOpen}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-6 text-secondary-600 group-hover:text-secondary-500 transition-colors"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  d="M4 4h2l2 11h12l2-9H8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="10" cy="19" r="1" />
                <circle cx="18" cy="19" r="1" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-fade-in">
                  {totalItems}
                </span>
              )}
            </button>
          </div>

          <div className="w-full md:w-auto flex flex-col md:flex-row items-center gap-4 md:gap-8 mt-4 md:mt-0 animate-slide-up">
            <div className="w-full md:w-72 xl:w-96">
              <SearchComponent />
            </div>

            <div className="flex gap-6 md:gap-8 items-center justify-end">
              <div className="flex gap-2 items-center group">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-5 text-secondary-600 group-hover:text-secondary-500 transition-colors"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <ModalLogin />
              </div>

              <Logout />

              <button
                className="hidden md:flex gap-2 items-center group relative"
                onClick={handleOpen}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-5 text-secondary-600 group-hover:text-secondary-500 transition-colors"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    d="M4 4h2l2 11h12l2-9H8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="10" cy="19" r="1" />
                  <circle cx="18" cy="19" r="1" />
                </svg>
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-bounce">
                    {totalItems}
                  </span>
                )}
                <span className="text-secondary-600 group-hover:text-secondary-500 transition-colors">
                  Cart
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={openShopingCartModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "10%",
            right: { xs: "5%", md: "10%" },
            width: { xs: "90%", md: 450 },
            bgcolor: "background.paper",
            p: 4,
            borderRadius: "0.5rem",
            boxShadow:
              "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          }}
        >
          <ShoppingCartModal closeModal={handleClose} />
        </Box>
      </Modal>
    </nav>
  );
}
