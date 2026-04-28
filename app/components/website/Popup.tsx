"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalPopup({ isOpen, onClose }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    website: "",
    comment: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          website: formData.website,
          message: formData.comment,
        }),
      });

      if (res.ok) {
        setIsSubmitted(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/70 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose} // 👉 outside click
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()} // ❗ prevent closing inside
            className="relative w-full max-w-5xl bg-white rounded-xl overflow-hidden shadow-2xl grid md:grid-cols-2"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-50 text-orange-500 hover:text-white cursor-pointer border rounded-full p-1"
            >
              <X />
            </button>

            {/* LEFT FORM */}
            <div className="p-8 md:p-10">
              <h2 className="text-4xl font-bold text-[#3d2c5a] mb-8">
                GET IN TOUCH
              </h2>

              {isSubmitted ? (
                <p className="text-green-600 font-semibold">
                  ✅ Thank you! We will contact you soon.
                </p>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {[
                    { name: "name", placeholder: "Name" },
                    { name: "email", placeholder: "Email" },
                    { name: "phone", placeholder: "Phone Number" },
                    { name: "website", placeholder: "Website URL" },
                  ].map((field) => (
                    <input
                      key={field.name}
                      name={field.name}
                      required
                      value={(formData as any)[field.name]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      className="w-full border-b border-gray-300 py-3 outline-none focus:border-orange-500 placeholder-gray-500"
                    />
                  ))}

                  <textarea
                    name="comment"
                    value={formData.comment}
                    onChange={handleChange}
                    placeholder="Comment"
                    rows={3}
                    className="w-full border-b border-gray-300 py-3 outline-none focus:border-orange-500 resize-none"
                  />

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#f28c28] hover:bg-[#e67e22] text-white font-semibold px-6 py-3 rounded-md transition-all disabled:opacity-60 cursor-pointer"
                  >
                    {isSubmitting ? "Submitting..." : "ENQUIRE NOW"}
                  </button>
                </form>
              )}
            </div>

            {/* RIGHT IMAGE */}
            <div className="hidden md:block relative">
              <img
                src="/smain-reality-images-3.png"
                alt="lead"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
