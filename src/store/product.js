import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useProductStore = defineStore("product", () => {
  const products = ref([]);
  const categories = ref();
  const gridView = ref(false);

  async function fetchProducts() {
    let res = await fetch("https://dummyjson.com/products?limit=100");
    let data = await res.json();
    products.value = await data.products;
  }

  function getProductById(id) {
    return products.value.find((product) => product.id === id);
  }

  function relatedProducts(category, amount = products.value.length) {
    return products.value
      .filter((product) => product.category === category)
      .slice(0, amount);
  }

  function getProductsByCategory(category) {
    return products.value.filter((product) => product.category === category);
  }

  const getProductCategories = computed(() => {
    return [...new Set(products.value.map((product) => product.category))];
  });

  const getNewArrival = computed(() => {
    return products.value.filter(
      (product) => product.id > products.value.length - 4
    );
  });

  const getRecomendedProducts = computed(() => {
    return products.value.filter(
      (product) => product.id > 20 && product.id < 29
    );
  });

  const getSearchProducts = computed(() => {
    return (search) =>
      products.value.filter((product) => {
        return product.title.toLowerCase().includes(search.toLowerCase());
      });
  });

  function getSearchProduct(searchInput) {
    return products.value.filter((product) =>
      product.title.toLowerCase().includes(searchInput.toLowerCase())
    );
  }

  return {
    products,
    getProductCategories,
    getProductById,
    fetchProducts,
    getProductsByCategory,
    getNewArrival,
    getRecomendedProducts,
    getSearchProducts,
    getSearchProduct,
    relatedProducts,
    gridView,
  };
});
