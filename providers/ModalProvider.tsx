"use client"
import { useEffect, useState } from "react"
import PreviewModal from "@/components/ui/PreviewModal"
import { OrderConfirmModal } from "@/components/modals/OrderConfirmModal"

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <>
      <PreviewModal />
      <OrderConfirmModal />
    </>
  )
}

export default ModalProvider
