import Image from 'next/image';
import Link from 'next/link';

export const Logo = ({ logo }: { logo?: string }) => {
  return (
    <Link href="/" prefetch={false}>
      <Image
        priority
        width={96}
        height={96}
        src={logo || `/logo-tuaf.png`}
        alt="logo Trường Đại học Nông lâm Thái Nguyên"
        quality={70}
        sizes="(max-width: 480px) 60px, (max-width: 768px) 80px, 96px"
      />
    </Link>
  );
};
