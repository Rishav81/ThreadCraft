import Seo from "../../Components/SEO/Seo";
import ProductForm from "./ProductForm";

const AddProduct = () => {
  return (
    <>
      <Seo
        title="Add Product | ThreadCraft"
        description="Add a new product to your ThreadCraft store."
        noindex={true}
      />
      <ProductForm mode="create" />;
    </>
  );
};

export default AddProduct;
