"use client"

import axios from "axios"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

import Button from "@/components/ui/Button"
import Currency from "@/components/ui/Currency"
import useCart from "@/hooks/useCart"
import { useOrderConfirmModal } from "@/hooks/useOrderConfirmModal"

const Summary = () => {
  const searchParams = useSearchParams()
  const items = useCart((state) => state.items)
  const removeAll = useCart((state) => state.removeAll)
  const [loading, setLoading] = useState(false)
  const orderConfirmModal = useOrderConfirmModal()

  useEffect(() => {
    if (searchParams.get("success")) {
      toast.success("Payment completed!")
      removeAll()
    }

    if (searchParams.get("cancelled")) {
      toast.error("Something went wrong!")
    }
  }, [removeAll, searchParams])

  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.price)
  }, 0)

  const onCheckout = async () => {
    setLoading(true)
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/orders/checkout`,
        {
          productIds: items.map((item) => item.id),
        },
      )

      const orderId = response.data.id
      orderConfirmModal.onOpen(orderId)
    } catch (error) {
      toast.error("Error in checking out!")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">Order total</div>
          <Currency value={totalPrice} />
        </div>
      </div>
      <Button
        onClick={onCheckout}
        className="w-full mt-6"
        disabled={!items.length || loading}
      >
        {loading ? "Preparing your order..." : "Checkout"}
      </Button>
    </div>
  )
}

export default Summary
