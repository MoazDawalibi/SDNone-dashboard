import {
  useGetQuery,
  useToggleStatus,
  useDeleteMutation,
  useUploadWithProgress,
  useUpdateMutation
} from "./helpers";

const API = {
  ADD: `/api/admin/product/add`,
  UPDATE: `/api/admin/product/update`,
  GET_SINGLE_PRODUCT: `/api/admin/product/details`,
  GET_ALL: `/api/admin/product/all`,
  UPDATE_STATUS: `/api/admin/product/update_status`,
  UPDATE_DETAILS: `/api/admin/owner_product/update`,
  UPDATE_IMAGES: `/api/admin/owner_product/update_images`,
  DELETE: `/api/admin/product/delete`,
  GET_OWNER_PRODUCT_COMMENTS: `/api/admin/owner_product/comments`,
  UPDATE_OWNER_PRODUCT_COMMENTS: `/api/admin/owner_product/update_comment_status`,
  GET_OWNER_PRODUCT_REVIEWS: `/api/admin/owner_product/reviews`,
  UPDATE_OWNER_PRODUCT_REVIEWS: `/api/admin/owner_product/update_review_status`,
};

const KEY = "PRODUCTS";

const SINGLE_PRODUCT_KEY = "SINGLE_OWNER_PRODUCT";
export const useGetProducts = (params) => useGetQuery(KEY, API.GET_ALL,params);
export const useUpdateProduct = () => useUploadWithProgress(KEY, API.UPDATE);


export const useAddProduct = () => useUploadWithProgress(KEY, API.ADD);
export const useUpdateProductStatus = () =>
  useToggleStatus(KEY, API.UPDATE_STATUS, "product_id", "owner_products");
export const useDeleteProduct = () =>
  useDeleteMutation(KEY, API.DELETE, "product_id", "owner_products");

export const useGetSingleProduct = ({product_id}) =>
  useGetQuery(
    SINGLE_PRODUCT_KEY,
    API.GET_SINGLE_PRODUCT,
    { product_id },
    { enabled: !!product_id }
  );
