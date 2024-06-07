import { host } from "./host";

export function category() {
  // Khởi tạo URL bằng host cơ sở
  let url = `${host}/category/category`;
  // Trả về một object chứa các hàm tạo URL cho các loại danh mục khác nhau
  return {
    product: () => {
      // Thêm phần '-product' vào URL
      url += "-product";
      return {
        list: () => `${url}-list`,// URL danh sách sản phẩm
        item: (id: number = 0) => `${url}?id=${id}`,// URL của một sản phẩm cụ thể
        create: () => `${url}-create`, // URL tạo sản phẩm mới
        modify: () => `${url}-modify`,// URL chỉnh sửa thông tin sản phẩm
        delete: (id: number = 0) => `${url}-delete?id=${id}`,// URL xóa sản phẩm
      };
    },
    news: () => {
        // Thêm phần '-news' vào URL
      url += "-news";
      return {
        list: (data: any) => `${url}-list?keyword=${data.keyword}`,
        item: (id: number = 0) => `${url}?id=${id}`,
        create: () => `${url}-create`,
        modify: () => `${url}-modify`,
        delete: (id: number = 0) => `${url}-delete?id=${id}`,
      };
    },
    size: () => {
       // Thêm phần '-size' vào URL
      url += "-size";
      return {
        list: () => `${url}-list`,
        item: (id: number = 0) => `${url}?id=${id}`,
        create: () => `${url}-create`,
        modify: () => `${url}-modify`,
        delete: (id: number = 0) => `${url}-delete?id=${id}`,
      };
    },
  };
}
