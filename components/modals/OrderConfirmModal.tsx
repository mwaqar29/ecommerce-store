"use client"

import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import axios from "axios"

import { useOrderConfirmModal } from "@/hooks/useOrderConfirmModal"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Button from "@/components/ui/Button"
import { toast } from "react-hot-toast"
import useCart from "@/hooks/useCart"
import { LoaderCircle } from "lucide-react"

const formSchema = z.object({
  phone: z.string().min(1),
  address: z.string().min(1),
})

export const OrderConfirmModal = () => {
  const orderConfirmModal = useOrderConfirmModal()
  const cart = useCart()

  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
      address: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true)

      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/orders/confirm`, {
        ...values,
        orderId: orderConfirmModal.orderId,
      })

      form.reset()
      orderConfirmModal.onClose()
      toast.success("Order placed successfully!")
      cart.removeAll()
    } catch (error) {
      toast.error("Something went wrong!")
    } finally {
      setLoading(false)
    }
  }

  const onChange = (open: boolean) => {
    if (!open) {
      orderConfirmModal.onClose()
    }
  }

  return (
    <Dialog open={orderConfirmModal.isOpen} onOpenChange={onChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Order</DialogTitle>
          <DialogDescription>
            Fill in the details and place an order
          </DialogDescription>
        </DialogHeader>
        <div>
          <div className="space-y-4 py-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-y-4">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input
                            disabled={loading}
                            placeholder="Enter phone"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input
                            disabled={loading}
                            placeholder="Enter address"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="space-x-2 flex items-center justify-end w-full">
                    <Button
                      disabled={loading}
                      variant="outline"
                      onClick={orderConfirmModal.onClose}
                    >
                      Cancel
                    </Button>
                    <Button disabled={loading} type="submit">
                      {loading ? (
                        <>
                          <div className="flex items-center">
                            Placing your order
                            <LoaderCircle className="ml-3 animate-spin" />
                          </div>
                        </>
                      ) : (
                        "Place Order"
                      )}
                    </Button>
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
