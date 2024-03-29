"use client"

import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react"
import { io, Socket } from "socket.io-client"
import type {
  GetClientEvents,
  GetServerEvents,
  SocketNamespaces,
} from "shared-utils"

export type DynamicSocket<N extends SocketNamespaces> = Socket<
  GetServerEvents<N>,
  GetClientEvents<N>
>

type SocketContextInterface<S extends SocketNamespaces> = {
  socket: DynamicSocket<S> | undefined
  getSocket: () => DynamicSocket<S> | undefined
  /** if useSocket is typed with a namespace, connect can only be called with the same namespace */
  connect: <N extends SocketNamespaces>(namespace?: N) => DynamicSocket<N>
}
const SocketContext = createContext(
  {} as SocketContextInterface<SocketNamespaces>,
)

const SocketContextProvider = ({ children }: PropsWithChildren) => {
  const [socket, setSocket] = useState<DynamicSocket<SocketNamespaces>>()

  useEffect(() => {
    return () => {
      socket && socket.disconnect()
    }
  }, [socket])

  const connect = (namespace?: SocketNamespaces) => {
    if (socket) socket.disconnect()

    const newSocket = io(`${process.env.NEXT_PUBLIC_API_URL}/${namespace}`, {
      transports: ["websocket"],
    })

    setSocket(newSocket)
    return newSocket
  }

  const getSocket = () => {
    if (socket) return socket
  }

  return (
    <SocketContext.Provider
      value={{
        getSocket,
        socket,
        connect,
      }}
    >
      {children}
    </SocketContext.Provider>
  )
}

/**
 * Give a namespace to useSocket to get a typed socket instance!
 */
export const useSocket = <N extends SocketNamespaces>(namespace?: N) =>
  useContext(SocketContext) as SocketContextInterface<N>
export default SocketContextProvider
