import { create } from "zustand"

interface useOrderConfirmModalStore {
  isOpen: boolean
  storeId: string
  orderId: string
  onOpen: (orderId: string) => void
  onClose: () => void
}

export const useOrderConfirmModal = create<useOrderConfirmModalStore>()(
  (set) => ({
    isOpen: false,
    storeId: "",
    orderId: "",
    onOpen: (orderId) => set({ isOpen: true, orderId }),
    onClose: () => set({ isOpen: false, orderId: "" }),
  }),
)
