"use client"

import React, { PropsWithChildren } from "react"
import { ThemeProvider } from "next-themes"
import SocketContextProvider from "~/contexts/SocketContext"
import UserContextProvider from "~/contexts/UserContext"
import Header from "~/components/Header"
import ToastProvider from "~/contexts/ToastContext"

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <ThemeProvider attribute="class">
      <SocketContextProvider>
        <UserContextProvider>
          <ToastProvider>
            <Header />
            {children}
          </ToastProvider>
        </UserContextProvider>
      </SocketContextProvider>
    </ThemeProvider>
  )
}

export default Providers
