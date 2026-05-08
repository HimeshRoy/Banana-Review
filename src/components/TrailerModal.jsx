import React from "react";
import { motion, AnimatePresence } from "framer-motion";

import { FaTimes } from "react-icons/fa";

const TrailerModal = ({
  isOpen,
  onClose,
  trailerKey,
}) => {
  return (
    <AnimatePresence>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[999] bg-black/80 backdrop-blur-md flex items-center justify-center px-4 pt-20"
        >

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-5xl"
          >

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 md:-top-14 md:right-0 text-white text-3xl hover:text-yellow-400 transition z-[1000]"
            >
              <FaTimes />
            </button>

            {/* Trailer */}
            <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">

              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
                title="Trailer"
                allowFullScreen
              ></iframe>

            </div>

          </motion.div>
        </motion.div>
      )}

    </AnimatePresence>
  );
};

export default TrailerModal;