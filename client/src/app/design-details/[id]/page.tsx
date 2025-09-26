
import ProductDetails from '@/components/elements/ProductDetails';

type Props = {
    params: { id: string }
};
const page = async ({ params }: Props) => {
    const { id } = await params;

    return (
        <div>
            <ProductDetails id={id} />
        </div>
    );
};

export default page;