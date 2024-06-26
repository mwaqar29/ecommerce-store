"use client"

import Image from "next/image"
import { Expand, ShoppingCart } from "lucide-react"
import { MouseEventHandler } from "react"
import { useRouter } from "next/navigation"

import { Product } from "@/types"
import IconButton from "@/components/ui/IconButton"
import Currency from "@/components/ui/Currency"
import usePreviewModel from "@/hooks/usePreviewModel"

interface ProductCardProps {
  data: Product
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const previewModal = usePreviewModel()
  const router = useRouter()

  const handleClick = () => {
    router.push(`/product/${data?.id}`)
  }

  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event?.stopPropagation()

    previewModal.onOpen(data)
  }

  return (
    <div
      className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4"
      onClick={handleClick}
    >
      {/* Images and Actions */}
      <div className="relative aspect-square bg-gray-100 rounded-xl">
        <Image
          src={data?.images?.[0].url}
          fill
          alt="Image"
          className="aspect-square object-cover rounded-md"
        />
        <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
          <div className="flex gap-x-6 justify-center">
            <IconButton
              onClick={onPreview}
              icon={<Expand size={20} className="text-gray-600" />}
            />
            <IconButton
              onClick={() => {}}
              icon={<ShoppingCart size={20} className="text-gray-600" />}
            />
          </div>
        </div>
      </div>
      {/* Description */}
      <div>
        <p className="font-semibold text-lg">{data.name}</p>
        <p className="text-gray-500 text-sm">{data.category?.name}</p>
      </div>
      {/* Price */}
      <div className="flex items-center justify-between">
        <Currency value={data?.price} />
      </div>
    </div>
  )
}

export default ProductCard
