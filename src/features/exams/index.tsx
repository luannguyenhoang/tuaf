import { Box, Container, HStack, Heading, SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { BiSolidCalendar } from 'react-icons/bi';
import { FaUniversity } from 'react-icons/fa';
import dynamic from 'next/dynamic';

const ModalBase = dynamic(() => import('@/features/home/Modal').then((mod) => mod.ModalBase));
const CardPlace = dynamic(() => import('@/features/exams/CardPlace').then((mod) => mod.CardPlace));
const TagPlace = dynamic(() => import('@/features/exams/TagPlace').then((mod) => mod.TagPlace));

const examsPlan = [
  {
    school: 'ĐH Ngoại ngữ - ĐH Đà Nẵng',
    item: [
      {
        name: 'Tháng 9',
        startAt: '12/09/2023',
        certi: 'A2, VSTEP( B1-B2-C1)',
        endRes: '27/09/2023',
        form: 'Trên máy tính',
        price: '1.800.000 VNĐ',
        includes:
          '01 phiếu đăng ký dự thi, 02 ảnh 3x4 không quá 3 tháng, 01 bản sao CMND/ căn cước công dân công chứng',
      },
      {
        name: 'Tháng 10',
        startAt: '07/10/2023',
        certi: 'A2, VSTEP( B1-B2-C1)',
        endRes: '27/09/2023',
        form: 'Trên máy tính',
        price: '1.800.000 VNĐ',
        includes:
          '01 phiếu đăng ký dự thi, 02 ảnh 3x4 không quá 3 tháng, 01 bản sao CMND/ căn cước công dân công chứng',
      },
      {
        name: 'Tháng 11',
        startAt: '14/11/2023',
        certi: 'A2, VSTEP( B1-B2-C1)',
        endRes: '27/09/2023',
        form: 'Trên máy tính',
        price: '1.800.000 VNĐ',
        includes:
          '01 phiếu đăng ký dự thi, 02 ảnh 3x4 không quá 3 tháng, 01 bản sao CMND/ căn cước công dân công chứng',
      },
      {
        name: 'Tháng 12',
        startAt: '16/12/2023',
        certi: 'A2, VSTEP( B1-B2-C1)',
        endRes: '27/09/2023',
        form: 'Trên máy tính',
        price: '1.800.000 VNĐ',
        includes:
          '01 phiếu đăng ký dự thi, 02 ảnh 3x4 không quá 3 tháng, 01 bản sao CMND/ căn cước công dân công chứng',
      },
    ],
  },
  {
    school: 'ĐH Cần Thơ',
    item: [
      {
        name: 'Tháng 9',
        startAt: '12/09/2023',
        certi: 'A2, VSTEP( B1-B2-C1)',
        endRes: '27/09/2023',
        form: 'Trên máy tính',
        price: '1.800.000 VNĐ',
        includes:
          '01 phiếu đăng ký dự thi, 02 ảnh 3x4 không quá 3 tháng, 01 bản sao CMND/ căn cước công dân công chứng',
      },
    ],
  },

  {
    school: 'Học viện An ninh Nhân dân',
    item: [
      {
        name: 'Tháng 9',
        startAt: '12/09/2023',
        certi: 'A2, VSTEP( B1-B2-C1)',
        endRes: '27/09/2023',
        form: 'Trên máy tính',
        price: '1.800.000 VNĐ',
        includes:
          '01 phiếu đăng ký dự thi, 02 ảnh 3x4 không quá 3 tháng, 01 bản sao CMND/ căn cước công dân công chứng',
      },
    ],
  },

  {
    school: 'ĐH Quy Nhơn',
    item: [
      {
        name: 'Tháng 9',
        startAt: '12/09/2023',
        certi: 'A2, VSTEP( B1-B2-C1)',
        endRes: '27/09/2023',
        form: 'Trên máy tính',
        price: '1.800.000 VNĐ',
        includes:
          '01 phiếu đăng ký dự thi, 02 ảnh 3x4 không quá 3 tháng, 01 bản sao CMND/ căn cước công dân công chứng',
      },
    ],
  },
];

export const ExamsPlan = () => {
  const [school, setSchool] = useState('all');
  const [month, setMonth] = useState(-1);
  const [exams, setExams] = useState<any>({});
  const { isOpen, onToggle, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const newExams = examsPlan.find((exam) => exam.school === school || school === 'all');
    setExams(newExams);
  }, [school, month]);
  return (
    <>
      <Box pb={'46px'}>
        <Box bg="linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(255,46,46,0.835171568627451) 0%, rgba(255,179,0,1) 100%);">
          <Container maxW={'6xl'} py="120px">
            <Heading as="h2" textAlign={'center'} size={'lg'} pb="16px" color={'white'}>
              Lịch thi Evstep
            </Heading>
          </Container>
        </Box>
        <Container maxW={'6xl'} pt={'42px'}>
          <Box>
            <Heading as={'h2'} size={'md'} pb={'16px'}>
              Lựa chọn trường
            </Heading>

            <HStack wrap={'wrap'}>
              <TagPlace
                leftIcon={<FaUniversity />}
                label={'Tất cả'}
                selected={false}
                onClick={() => setSchool('all')}
              />
              {examsPlan.map((exam, index) => (
                <TagPlace
                  leftIcon={<FaUniversity />}
                  key={index}
                  label={exam.school}
                  selected={false}
                  onClick={() => setSchool(exam.school)}
                />
              ))}
            </HStack>
          </Box>

          <Box>
            <Heading as={'h2'} size={'md'} pb={'16px'}>
              Lựa chọn tháng
            </Heading>

            <HStack wrap={'wrap'}>
              <TagPlace
                leftIcon={<BiSolidCalendar />}
                label={'Tất cả'}
                selected={false}
                onClick={() => setMonth(-1)}
              />
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item, index) => (
                <TagPlace
                  leftIcon={<BiSolidCalendar />}
                  key={item}
                  label={`Tháng ${item}`}
                  selected={false}
                  onClick={() => setMonth(index)}
                />
              ))}
            </HStack>
          </Box>

          <Box>
            <Heading as={'h2'} size={'md'} mt={'46px'} pb={'24px'}>
              Lịch thi
            </Heading>

            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={'36px'}>
              {exams?.item?.map((detail: any, index: number) => (
                <CardPlace
                  key={index}
                  school={exams.school}
                  label={detail.name}
                  certi={detail.certi}
                  startAt={detail.startAt}
                  endRes={detail.endRes}
                  includes={detail.includes}
                  selected={false}
                  onCLick={onToggle}
                />
              ))}
            </SimpleGrid>
          </Box>
        </Container>
      </Box>
      <ModalBase isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </>
  );
};
