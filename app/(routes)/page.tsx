import getBillboard from "@/actions/get-billboard"
import getProducts from "@/actions/get-products"
import Billboard from "@/components/Billboard"
import ProductLlist from "@/components/ProductList"
import Container from "@/components/ui/Container"

export const revalidate = 0

const Home = async () => {
  const products = await getProducts({ isFeatured: true })
  const billboard = await getBillboard("cc59b7b1-dfc5-40ea-9218-3efce5d74274")

  return (
    <Container>
      <div className="space-y-10 pb-10">
        <Billboard data={billboard} />
        <div className="flex flex-col gap-y-8 px-4 sm:px6 lg:px-8">
          <ProductLlist title="Featured Products" items={products} />
        </div>
      </div>
    </Container>
  )
}

export default Home
