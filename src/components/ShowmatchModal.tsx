"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, CheckCircle2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { showmatchRegistrationSchema, ShowmatchRegistrationInput } from "@/lib/schema";
import { submitShowmatchRegistration } from "@/app/actions";
import { toast } from "sonner";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

export default function ShowmatchModal({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ShowmatchRegistrationInput>({
    resolver: zodResolver(showmatchRegistrationSchema),
  });

  const openModal = () => {
    setIsOpen(true);
    setIsSuccess(false);
  };

  const closeModal = () => {
    setIsOpen(false);
    setTimeout(() => {
      reset();
      setIsSuccess(false);
    }, 300);
  };

  const onSubmit = async (data: ShowmatchRegistrationInput) => {
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("payload", JSON.stringify(data));

    const result = await submitShowmatchRegistration(formData);
    setIsSubmitting(false);

    if (result.success) {
      setIsSuccess(true);
      toast.success("Showmatch registration submitted!");
    } else {
      toast.error(result.error || "An error occurred.");
    }
  };

  const InputField = ({ label, name, type = "text", placeholder }: { label: string, name: keyof ShowmatchRegistrationInput, type?: string, placeholder?: string }) => (
    <div className="flex flex-col space-y-2">
      <label className="text-gray-400 font-grotesk text-sm uppercase tracking-wider">{label}</label>
      <input
        type={type}
        {...register(name)}
        placeholder={placeholder}
        className={cn(
          "bg-carbon-800 text-white px-4 py-3 rounded-none outline-none border-b-2 transition-colors",
          errors[name] ? "border-red-500" : "border-carbon-700 focus:border-neon-cyan"
        )}
      />
      {errors[name] && <span className="text-red-500 text-xs">{errors[name]?.message}</span>}
    </div>
  );

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-carbon-900/90 backdrop-blur-md overflow-y-auto"
          onClick={closeModal}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative w-full max-w-3xl bg-carbon-900 border border-carbon-700 shadow-[0_0_50px_rgba(0,0,0,0.8)] my-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="border-b border-carbon-700 p-6 flex justify-between items-center bg-carbon-800/50">
              <h2 className="text-2xl font-grotesk font-bold text-neon-cyan uppercase tracking-widest">
                Showmatch Registration
              </h2>
              <button type="button" onClick={closeModal} className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                <X size={24} />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 md:p-8">
              {isSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center space-y-6"
                >
                  <CheckCircle2 size={80} className="text-neon-cyan" />
                  <h3 className="text-3xl font-grotesk font-bold text-white uppercase">Submission Received</h3>
                  <p className="text-gray-400 max-w-md">
                    We will manually verify your Product Serial Number. If approved, you will receive a confirmation email with further details.
                  </p>
                  <button 
                    type="button"
                    onClick={closeModal}
                    className="mt-4 px-8 py-3 bg-carbon-800 border border-neon-cyan text-neon-cyan font-grotesk font-bold uppercase hover:bg-neon-cyan/10 transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                  
                  <div className="space-y-6">
                    <h3 className="text-xl font-grotesk font-bold text-white uppercase border-l-4 border-neon-cyan pl-3">Personal Information</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <InputField label="Full Name" name="fullName" placeholder="John Doe" />
                      <InputField label="In-Game Name (IGN)" name="ign" placeholder="Xx_Sniper_xX" />
                      <InputField label="Game UID" name="uid" placeholder="123456789" />
                      <InputField label="Discord ID" name="discordId" placeholder="john#1234" />
                      <InputField label="Email Address" name="email" type="email" placeholder="john@example.com" />
                      <InputField label="Phone Number" name="phoneNumber" placeholder="+880 1..." />
                      <InputField label="Area" name="area" placeholder="Dhaka" />
                      <InputField label="Full Address" name="address" placeholder="House 1, Road 2..." />
                    </div>
                  </div>

                  <div className="space-y-6 pt-4 border-t border-carbon-700/50">
                    <h3 className="text-xl font-grotesk font-bold text-white uppercase border-l-4 border-neon-green pl-3">Product Information</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <InputField label="Product Serial Number" name="productSerialNumber" placeholder="e.g. AB123456789" />
                    </div>
                  </div>

                  <div className="pt-8 flex justify-end">
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full md:w-auto px-10 py-4 bg-gradient-to-br from-neon-cyan to-neon-green text-black font-grotesk font-bold uppercase tracking-widest hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={20} className="animate-spin mr-2" />
                          Processing
                        </>
                      ) : (
                        "Submit Showmatch Entry"
                      )}
                    </button>
                  </div>

                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <div onClick={openModal} className="contents">{children}</div>
      {mounted && createPortal(modalContent, document.body)}
    </>
  );
}
