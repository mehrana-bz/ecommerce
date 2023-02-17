import axios from "axios";
import { useEffect , useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../store/states/products";

const ProductPage = () => {
    const {id} = useParams();
    const [product,setProduct] = useState<Product>();

    useEffect(() => {
        axios.get<Product>(`https://api.escuelajs.co/api/v1/products/${id}`)
        .then(res => res.data)
        .then((fetchedProduct) => setProduct(fetchedProduct));
    },[])
    return(
        <>
          
        </>
    )
}

export default ProductPage;
