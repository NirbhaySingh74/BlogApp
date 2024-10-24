"use client"
import React, { useState } from 'react';
import { motion } from "framer-motion";
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  // Animation variants
  const navItemVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 }
  };

  const logoVariants = {
    hover: { 
      scale: 1.02,
      rotate: [0, -2, 2, -2, 0],
      transition: { duration: 0.5 }
    }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.05,
      boxShadow: "0px 0px 8px rgb(255,255,255,0.3)",
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.95 }
  };

  const handleAuth = () => {
    if (session) {
      signOut();
    } else {
      signIn();
    }
  };

  const handleWrite = () => {
    if (!session) {
      signIn();
    } else {
      router.push('/write');
    }
  };

  const navItems = [
    {
      label: "Write",
      onClick: handleWrite
    },
    {
      label: session ? "Sign out" : "Sign in",
      onClick: handleAuth
    }
  ];

  return (
    <header className="text-white border-b border-gray-800 sticky top-0 z-50 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div 
            className="flex items-center cursor-pointer"
            variants={logoVariants}
            whileHover="hover"
            onClick={() => router.push('/')}
          >
            <h2 className="text-2xl font-bold">WriteSphere</h2>
          </motion.div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.button
                key={item.label}
                onClick={item.onClick}
                className="text-gray-300 hover:text-white text-sm relative"
                variants={navItemVariants}
                whileHover="hover"
                whileTap="tap"
              >
                {item.label}
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-white"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.button>
            ))}
            {!session && (
              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Button 
                  variant="outline" 
                  className="bg-white text-black hover:bg-gray-100 rounded-full px-4 py-1 text-sm font-medium"
                  onClick={() => signIn("/signin")}
                >
                  Get started
                </Button>
              </motion.div>
            )}
          </nav>
        </div>

        {/* Mobile Menu */}
        <motion.nav
          className="md:hidden"
          initial={{ height: 0, opacity: 0 }}
          animate={{ 
            height: isOpen ? "auto" : 0,
            opacity: isOpen ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
        >
          {isOpen && (
            <div className="py-4 space-y-4">
              {navItems.map((item) => (
                <motion.button
                  key={item.label}
                  onClick={item.onClick}
                  className="block text-gray-300 hover:text-white text-sm py-2 w-full text-left"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {item.label}
                </motion.button>
              ))}
              {!session && (
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <Button 
                    variant="outline" 
                    className="w-full bg-white hover:bg-gray-100 rounded-full px-4 py-1 text-sm font-medium text-black"
                    onClick={() => signIn()}
                  >
                    Get started
                  </Button>
                </motion.div>
              )}
            </div>
          )}
        </motion.nav>
      </div>
    </header>
  );
};

export default Header;