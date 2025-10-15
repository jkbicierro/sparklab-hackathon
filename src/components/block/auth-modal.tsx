'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "../ui/button"
import { useState } from "react";
import { Input } from "../ui/input";

interface AuthOpen {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  type: string
}

export function AuthModal({children}: Readonly<{children: React.ReactNode}>) {
  const [type, setType] = useState("login")

  if (type == "login") {
    return (
      <Dialog >
        <DialogTrigger asChild>
            {children}
        </DialogTrigger>
        <DialogContent className="w-[300px]">
          <DialogHeader>
            <DialogTitle className="mb-[8px]">Login</DialogTitle>
            <DialogDescription className="space-y-[12px] w-full flex flex-col items-center">
              <Input type="email" placeholder="Email" required />
              <Input type="password" placeholder="Password" required />
              <Button className="bg-primary w-full">Login</Button>
              <button onClick={() => {setType("signup")}} className="flex items-center hover:underline hover:underline-offset-1 cursor-pointer">Don't have an account? Click me.</button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  }  
    return (
      <Dialog >
        <DialogTrigger asChild>
            {children}
        </DialogTrigger>
        <DialogContent className="w-[300px]">
          <DialogHeader>
            <DialogTitle className="mb-[8px]">Sign up</DialogTitle>
            <DialogDescription className="space-y-[12px] w-full flex flex-col items-center">
              <Input type="email" placeholder="Email" required/>
              <Input type="password" placeholder="Password" required/>
              <Button className="bg-primary w-full">Sign up</Button>
              <button onClick={() => {setType("login")}} className="flex items-center hover:underline hover:underline-offset-1 cursor-pointer">Have an account? Click me.</button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
}