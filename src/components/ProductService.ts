
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/components/ProductCard";
import { useAuth } from "@/contexts/AuthContext";

export interface ProductInput {
  name: string;
  description: string;
  price: number;
  category: string;
  is_organic: boolean;
  image?: string;
}

export const useProductService = () => {
  const { user, profile } = useAuth();

  const fetchProducts = async (): Promise<Product[]> => {
    if (!user) {
      throw new Error("User not authenticated");
    }

    const { data, error } = await supabase
      .from("products")
      .select(`
        id,
        name,
        description,
        price,
        image,
        category,
        is_organic,
        profiles:farmer_id (
          id,
          name,
          image
        )
      `);

    if (error) {
      console.error("Error fetching products:", error);
      throw error;
    }

    return data.map((item) => ({
      id: item.id,
      name: item.name,
      description: item.description,
      price: Number(item.price),
      image: item.image || "",
      category: item.category,
      isOrganic: item.is_organic,
      farmer: {
        id: item.profiles.id,
        name: item.profiles.name,
        image: item.profiles.image || "",
      },
    }));
  };

  const createProduct = async (product: ProductInput): Promise<string> => {
    if (!user || !profile) {
      throw new Error("User not authenticated or profile not loaded");
    }

    const { data, error } = await supabase
      .from("products")
      .insert({
        farmer_id: user.id,
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        is_organic: product.is_organic,
        image: product.image,
      })
      .select("id")
      .single();

    if (error) {
      console.error("Error creating product:", error);
      throw error;
    }

    return data.id;
  };

  const updateProduct = async (id: string, product: ProductInput): Promise<void> => {
    if (!user) {
      throw new Error("User not authenticated");
    }

    const { error } = await supabase
      .from("products")
      .update({
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        is_organic: product.is_organic,
        image: product.image,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  };

  const deleteProduct = async (id: string): Promise<void> => {
    if (!user) {
      throw new Error("User not authenticated");
    }

    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
  };

  return {
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
  };
};
