import Image from 'next/image';
import Link from 'next/link';

export const Logo = ({ logo }: { logo?: string }) => {
  return (
    <Link href="/" prefetch={false}>
      <Image
        priority
        width={80}
        height={80}
        src={logo || `/logo-tuaf.png`}
        alt="logo Trường Đại học Nông lâm Thái Nguyên"
        quality={70}
      />
    </Link>
  );
};
