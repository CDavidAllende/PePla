import Link from "next/link";
import { buttonVariants } from "./ui/button";

const BannerProduct = () => {
    return (
        <>
            <div className="mt-4 text-center">
                <p>Los mejores juegos</p>
                <h4 className="mt-2 text-5xl font-extrabold upperce">Puros GOTYS 🤑</h4>
                <p className="my-2 text-lg">Dale placer al mejor hoobie</p>
                <Link href="#" className={buttonVariants()}>Comprar</Link>
            </div>
            <div className="h-[350px] bg-cover lg:h-[900px] bg-[url('/banner.jpg')] bg-center mt-5" />
        </>
    )
}

export default BannerProduct;