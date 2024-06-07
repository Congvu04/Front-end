import { host } from "./host";

export function admin() {
  let url = `${host}/admin/`; // Khởi tạo URL bằng host cơ sở
  return {  // Trả về một object chứa các hàm tạo URL cho các endpoint liên quan đến quản trị viên
    list: () => `${url}list`,
    create: () => `${url}create`,
    modify: () => `${url}modify`,
    user: (id: number = 0) => `${url}user?id=${id}`,
    login: () => `${url}login`,
  };
}
