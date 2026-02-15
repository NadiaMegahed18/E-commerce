import { CategoryType } from "../_types/product.type";

export async function getAllCategories(): Promise<CategoryType[] | null> {

    try {
        let res = await fetch("https://ecommerce.routemisr.com/api/v1/categories", {
            cache: "force-cache"
        });

        let resData = await res.json();

        console.log(resData.data);

        return resData.data;

    } catch (error) {
        return null;
    }

}