import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../custom-hooks/reduxHook";
import { getSingleProduct } from "../../redux/feature/newProductSlice";
import { RootState } from "../../redux/store/store";
import React, { useEffect } from "react";
import ProductDetailsCard from "../../components/ProductDetailsCard";

const ProductDetails:React.FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { singleProduct } = useAppSelector(
    (state: RootState) => state.newProduct
  );
  console.log(singleProduct);

  useEffect(() => {
    dispatch(getSingleProduct(Number(id)));
  }, [dispatch]);

  return (
    <div className="container p-5">
      <ProductDetailsCard
        image={singleProduct.image ?? ""}
        id={singleProduct.id ?? 0}
        title={singleProduct.title ?? "Loading..."}
        category={singleProduct.category ?? "Unknown"}
        description={singleProduct.description ?? "No description available"}
        price={singleProduct.price ?? 0}
        rating={Math.floor(singleProduct.rating?.rate ?? 0)}
      />
    </div>
  );
};

export default ProductDetails;
