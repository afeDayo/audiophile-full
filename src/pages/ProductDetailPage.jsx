import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ImPlus, ImMinus } from "react-icons/im";
import { MdKeyboardArrowRight } from "react-icons/md";
import Man from "../components/Man";
import Cart from "../components/Cart";
import { useStore } from "../context/StoreContext";

// Import placeholder images for gallery
import headguy from "../assets/Bitmap guy.png";
import headdisplay from "../assets/Bitmap display.png";
import headshot from "../assets/Bitmap shot.png";
import headgear from "../assets/headgear.png";
import speakerone from "../assets/speaker1.png";
import earpeez from "../assets/earpeez.png";
import RollerLoader from "../components/RollerLoader";

const ProductDetailPage = () => {
  const { id } = useParams();
  const { getProductById, addToCart, products, loading } = useStore();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();

  // Define specific "you may also like" mappings for each product
  const youMayAlsoLikeMap = {
    // Headphones
    "XX99 Mark II Headphones": [
      "XX99 Mark I Headphones",
      "XX59 Headphones",
      "ZX9 Speaker",
    ],
    "XX99 Mark I Headphones": [
      "XX99 Mark II Headphones",
      "XX59 Headphones",
      "ZX9 Speaker",
    ],
    "XX59 Headphones": [
      "XX99 Mark II Headphones",
      "XX99 Mark I Headphones",
      "ZX9 Speaker",
    ],

    // Speakers
    "ZX9 Speaker": ["ZX7 Speaker", "XX99 Mark I Headphones", "XX59 Headphones"],
    "ZX7 Speaker": ["ZX9 Speaker", "XX99 Mark I Headphones", "XX59 Headphones"],

    // Earphones
    "YX1 Wireless Earphones": [
      "XX99 Mark I Headphones",
      "XX59 Headphones",
      "ZX9 Speaker",
    ],
  };

  useEffect(() => {
    if (id && products.length > 0) {
      const foundProduct = getProductById(id);
      setProduct(foundProduct);
    }
  }, [id, products, getProductById]);

  if (loading) {
    return <RollerLoader />;
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl font-bold">Product not found</div>
        <button
          onClick={() => {
            navigate(-1);
          }}
          className="ml-4 text-blue-500 hover:underline"
        >
          Go Home
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setQuantity(1);
  };

  // Get specific "you may also like" products based on mapping
  const getYouMayAlsoLike = () => {
    const productNames = youMayAlsoLikeMap[product.name];

    if (productNames) {
      // Find products by name in the specified order
      return productNames
        .map((name) => products.find((p) => p.name === name))
        .filter(Boolean); // Remove any undefined values if product not found
    }

    // Fallback: if no specific mapping, use category-based approach
    return products
      .filter((p) => p.category === product.category && p._id !== product._id)
      .slice(0, 3);
  };

  const youMayAlsoLike = getYouMayAlsoLike();

  // Use product gallery if available, otherwise use placeholders
  const galleryImages =
    product.gallery && product.gallery.length > 0
      ? product.gallery
      : [headguy, headdisplay, headshot];

  return (
    <div className="mt-4">
      {/* Go Back Button */}
      <div className="text-start mb-8 md:mb-8 lg:mb-14 px-6 md:px-10 lg:px-12 xl:px-[11.458333vw]">
        <button
          onClick={() => {
            navigate(-1);
          }}
          className="font-normal text-sm text-[#00000050] hover:text-[#D87D4A]"
        >
          Go Back
        </button>
      </div>

      {/* Main Product Section */}
      <div className="flex flex-col lg:flex-row md:flex-row items-center justify-between px-6 md:px-10 lg:px-12 xl:px-[11.458333vw] gap-8 md:gap-12 lg:gap-0">
        {/* Product Image */}
        <div className="w-full lg:w-[45%] xl:w-[540px] bg-[#F1F1F1] rounded-lg h-[300px] md:h-[500px] lg:h-[560px] flex items-center justify-center relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-36 md:w-[181px] object-contain lg:w-80"
            onError={() => setImageError(true)}
          />
          <div className="absolute bottom-8 md:bottom-20 left-1/2 -translate-x-1/2 w-[120px] md:w-[200px] h-2.5 md:h-[15px] rounded-full bg-black blur-xl md:blur-2xl"></div>
        </div>

        {/* Product Info */}
        <div className="w-full lg:w-[50%] xl:w-[445px] text-start lg:text-start flex flex-col gap-4 md:gap-[29px]">
          {product.isNew && (
            <h4 className="font-normal text-xs md:text-[14px] tracking-[8px] uppercase text-[#D87D4A]">
              NEW PRODUCT
            </h4>
          )}
          <h1 className="font-bold text-[28px] md:text-4xl lg:text-[32px] xl:text-[40px] leading-tight md:leading-11 tracking-[1px] md:tracking-[2px] uppercase text-[#000000]">
            {product.name}
          </h1>
          <p className="font-normal text-[15px] leading-relaxed text-[#00000050] md:pr-2">
            {product.description}
          </p>
          <p className="font-bold text-lg md:text-[18px] text-[#000000] tracking-[1px]">
            $ {product.price?.toLocaleString()}
          </p>
          <div className="flex items-center gap-4">
            <div className="w-[180px] md:w-[120px] h-12 flex items-center justify-between bg-[#F1F1F1] px-5">
              <ImMinus
                className="text-[#00000025] text-[6px] cursor-pointer hover:text-[#D87D4A]"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              />
              <p className="font-bold text-[13px] tracking-[1px] text-[#000000]">
                {quantity}
              </p>
              <ImPlus
                className="text-[#00000025] text-[6px] cursor-pointer hover:text-[#D87D4A]"
                onClick={() => setQuantity(quantity + 1)}
              />
            </div>
            <button
              onClick={handleAddToCart}
              className="w-full md:w-40 h-12 bg-[#D87D4A] font-bold text-[13px] tracking-[1px] uppercase text-[#FFFFFF] cursor-pointer hover:bg-[#FBAF85]"
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </div>

      {/* Features & In The Box */}
      <div className="mt-16 md:mt-32 lg:mt-40 px-6 md:px-10 lg:px-[11.458333vw]">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8 md:gap-12 lg:gap-[125px]">
          {/* Features */}
          <div className="w-full lg:w-[60%] xl:w-[635px] gap-4 flex flex-col lg:text-start text-start">
            <h3 className="font-bold text-[24px] md:text-[32px] text-[#000000] tracking-[1px] uppercase">
              FEATURES
            </h3>
            <p className="font-normal text-[15px] text-[#00000050] leading-relaxed">
              {product.features}
            </p>
          </div>

          {/* In The Box */}
          <div className="w-full flex flex-col md:flex-row md:items-start md:justify-between md:w-[549px] gap-6 text-start lg:flex-col">
            <h3 className="font-bold text-2xl md:text-[32px] text-[#000000] tracking-[1px] uppercase">
              in the box
            </h3>
            <div className="flex flex-col gap-2">
              {product.inTheBox?.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <p className="font-bold text-sm text-[#D87D4A] leading-[25px]">
                    {item.quantity}x
                  </p>
                  <p className="font-normal text-sm text-[#00000050]">
                    {item.item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Gallery */}
      <div className="mt-16 md:mt-32 lg:mt-40 px-6 md:px-10 lg:px-12 xl:px-[11.458333vw]">
        <div className="flex flex-col lg:flex-row md:flex-row items-center justify-between gap-6 md:gap-4.5">
          <div className="flex flex-col gap-6 md:gap-4.5 lg:gap-8">
            <img
              src={galleryImages[0]}
              alt={`${product.name} gallery 1`}
              className="w-full rounded-lg"
            />
            <img
              src={galleryImages[1]}
              alt={`${product.name} gallery 2`}
              className="w-full rounded-lg"
            />
          </div>
          <div>
            <img
              src={galleryImages[2]}
              alt={`${product.name} gallery 3`}
              className="w-full rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* You May Also Like */}
      {youMayAlsoLike.length > 0 && (
        <div className="mt-16 md:mt-32 lg:mt-40 px-6 md:px-10 lg:px-12 xl:px-[11.458333vw]">
          <div className="flex flex-col gap-8 md:gap-13.5">
            <h3 className="font-bold text-2xl md:text-[32px] text-[#000000] tracking-[1px] uppercase text-center lg:text-center">
              you may also like
            </h3>
            <div className="flex flex-col items-center justify-between gap-8 md:gap-4 lg:gap-4 md:flex-row">
              {youMayAlsoLike.map((relatedProduct) => (
                <div
                  key={relatedProduct._id}
                  className="w-full lg:w-[30%] xl:w-[350px] flex flex-col items-center gap-6 md:gap-8.5"
                >
                  <div className="w-full h-[120px] md:h-[300px] lg:h-[318px] flex items-center justify-center rounded-lg bg-[#F1F1F1]">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-[75px] md:w-[140px] object-contain"
                    />
                  </div>
                  <h4 className="font-bold text-[20px] md:text-[24px] text-[#000000] tracking-[1px] uppercase text-center">
                    {relatedProduct.name.slice(0, 12)}
                  </h4>
                  <Link to={`/product/${relatedProduct._id}`}>
                    <button className="w-40 h-12 bg-[#D87D4A] font-bold text-[13px] tracking-[1px] uppercase text-[#FFFFFF] cursor-pointer hover:bg-[#FBAF85]">
                      See Product
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Category Navigation */}
      <div className="mt-12 md:mt-20 lg:mt-32 xl:mt-[180px] px-6 md:px-10 lg:px-[11.458333vw]">
        <div className="flex flex-col items-center justify-between gap-6 md:gap-4 lg:gap-8 pt-12 md:flex-row">
          <Link
            to="/headphones"
            className="w-full lg:w-[30%] xl:w-[350px] bg-[#F1F1F1] relative h-[165px] lg:h-[204px] md:h-[165px] rounded-lg pt-[90px] md:pt-[85px] lg:pt-[120px] group cursor-pointer md:mt-12"
          >
            <div className="absolute top-[-30%] md:top-[-38%] left-1/2 -translate-x-1/2 w-[60%] md:w-[40%] flex justify-center">
              <div className="relative">
                <img
                  src={headgear}
                  alt="headgear"
                  className="z-10 w-20 md:w-none lg:w-[122.95px]"
                />
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 md:w-[120px] h-[15px] md:h-[25px] rounded-full bg-black blur-[20px] md:blur-[30px]"></div>
              </div>
            </div>
            <div className="flex flex-col items-center gap-3">
              <h4 className="text-[15px] md:text-[18px] font-bold tracking-[1px] text-[#000000]">
                HEADPHONES
              </h4>
              <div className="flex items-center gap-1.5">
                <p className="text-xs font-bold tracking-[0.5px] uppercase text-[#00000050] group-hover:text-[#D87D4A]">
                  Shop
                </p>
                <MdKeyboardArrowRight className="text-lg md:text-[22px] text-[#D87D4A]" />
              </div>
            </div>
          </Link>

          <Link
            to="/speakers"
            className="w-full lg:w-[30%] xl:w-[350px] bg-[#F1F1F1] lg:h-[204px] lg:pt-[120px] relative h-[165px] md:h-[165px] rounded-lg pt-[90px] md:pt-[85px] group cursor-pointer mt-12"
          >
            <div className="absolute top-[-28%] md:top-[-34%] left-1/2 -translate-x-1/2 w-[60%] md:w-[40%] flex justify-center">
              <div className="relative">
                <img
                  src={speakerone}
                  alt="speaker"
                  className="z-10 w-[84px] md:w-none lg:w-[121.49px]"
                />
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 md:w-[120px] h-[15px] md:h-[25px] rounded-full bg-black blur-[20px] md:blur-[30px]"></div>
              </div>
            </div>
            <div className="flex flex-col items-center gap-3">
              <h4 className="text-[15px] md:text-[18px] font-bold tracking-[1px] text-[#000000]">
                SPEAKERS
              </h4>
              <div className="flex items-center gap-1.5">
                <p className="text-xs font-bold tracking-[0.5px] uppercase text-[#00000050] group-hover:text-[#D87D4A]">
                  Shop
                </p>
                <MdKeyboardArrowRight className="text-lg md:text-[22px] text-[#D87D4A]" />
              </div>
            </div>
          </Link>

          <Link
            to="/earphones"
            className="w-full lg:w-[30%] xl:w-[350px] bg-[#F1F1F1] relative h-[165px] md:h-[165px] rounded-lg pt-[90px] md:pt-[85px] group cursor-pointer mt-12 lg:h-[204px] lg:pt-[120px]"
          >
            <div className="absolute top-[-24%] md:top-[-28%] left-1/2 -translate-x-1/2 w-[60%] md:w-[40%] flex justify-center">
              <div className="relative">
                <img
                  src={earpeez}
                  alt="earphones"
                  className="z-10 w-[103px] md:w-none lg:w-[125px]"
                />
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 md:w-[120px] h-[15px] md:h-[25px] rounded-full bg-black blur-[20px] md:blur-[30px]"></div>
              </div>
            </div>
            <div className="flex flex-col items-center gap-3">
              <h4 className="text-[15px] md:text-[18px] font-bold tracking-[1px] text-[#000000]">
                EARPHONES
              </h4>
              <div className="flex items-center gap-1.5">
                <p className="text-xs font-bold tracking-[0.5px] uppercase text-[#00000050] group-hover:text-[#D87D4A]">
                  Shop
                </p>
                <MdKeyboardArrowRight className="text-lg md:text-[22px] text-[#D87D4A]" />
              </div>
            </div>
          </Link>
        </div>
      </div>
      {/* Man Component */}
      <div className="mt-16 md:mt-32 lg:mt-40">
        <Man />
      </div>

      <Cart />
    </div>
  );
};

export default ProductDetailPage;
