export const toSlug = ({
  type = 'unsigned',
  input,
}: {
  type?: 'unsigned' | 'signed';
  input: string;
}) => {
  // xóa dấu
  switch (type) {
    case 'unsigned': {
      input = input.replace(
        /@|\^|\*|\(|\)|\%|\!|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
        ''
      );
      // Xóa khoảng trắng thay bằng ký tự -
      input = input.replace(/(\s+)/g, '-');

      // Xóa ký tự - liên tiếp
      input = input.replace(/-+/g, '-');

      // xóa phần dư - ở đầu & cuối
      const output = input.replace(/^-+|-+$/g, '');
      return output;
    }

    case 'signed': {
      // xóa dấu
      input = input.toLowerCase();

      input = input
        .normalize('NFD') // chuyển chuỗi sang unicode tổ hợp
        .replace(/[\u0300-\u036f]/g, ''); // xóa các ký tự dấu sau khi tách tổ hợp

      // Thay ký tự đĐ
      input = input.replace(/[đĐ]/g, 'd');

      // Xóa ký tự đặc biệt
      input = input.replace(/([^0-9a-z-\s])/g, '');

      // Xóa khoảng trắng thay bằng ký tự -
      // input = input.replace(/(\s+)/g, "-");

      // Xóa ký tự - liên tiếp
      input = input.replace(/-+/g, '-');

      // xóa phần dư - ở đầu & cuối
      const output = input.replace(/^-+|-+$/g, '');
      return output;
    }

    default:
      return input;
  }
};
