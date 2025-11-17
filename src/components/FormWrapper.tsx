/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEffect, useState } from 'react';
import { Box, Heading, Text, Stack, Skeleton } from '@chakra-ui/react';
import { Loading } from './Loading';
import { FormGetFly } from './FormGetFly';
import { FormSam } from './FormSam';
import { FormGoogle } from './FormGoogle';

interface FormData {
  type: 'form-getfly' | 'form-sam' | 'form-google' | 'unknown';
  url: string;
  uuid: string;
  divId: string;
  divClass: string;
}

export const FormWrapper = ({
  title,
  color,
  type = 'form-main',
}: {
  title?: string;
  color?: string;
  type?: 'form-main' | 'form-poup';
}) => {
  const [formData, setFormData] = useState<FormData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFormData = async () => {
      const key = `form-data-form-main`;
      const cacheExpireMs = 1000 * 60 * 60 * 6; // 6 tiếng

      try {
        const cached = localStorage.getItem(key);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (parsed.expires > Date.now()) {
            setFormData(parsed.data);
            setIsLoading(false);
            return;
          } else {
            localStorage.removeItem(key); // Xoá cache hết hạn
          }
        }

        // Gọi API nếu không có cache
        const res = await fetch(`/api/gen-form/?type=form-main`);
        if (!res.ok) {
          throw new Error(`Form fetch failed: ${res.statusText}`);
        }
        const data = await res.json();
        setFormData(data);

        // Lưu vào localStorage
        localStorage.setItem(
          key,
          JSON.stringify({
            data,
            expires: Date.now() + cacheExpireMs,
          })
        );
      } catch (error) {
        console.error('Error fetching form data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFormData();
  }, []);

  if (isLoading) {
    return (
      <Skeleton height="38vh">
        <Box height="38vh"></Box>
      </Skeleton>
    );
  }

  if (!formData) {
    return <Heading color="red.500">Unable to load form</Heading>;
  }

  return (
    <>
      <Box
        bg={'white'}
        pt={'12px'}
        pb={0}
        rounded={'md'}
        border={'3px solid #08326D'}
        px={{ base: '4px', md: '6px', lg: '8px' }}
      >
        <>
          <Text
            fontSize={{ md: '30px', base: '22px' }}
            textAlign={'center'}
            lineHeight={1.2}
            color={'#FF1E1E'}
            fontWeight={700}
            mx={1}
            my={3}
          >
            ĐĂNG KÝ NHẬN TƯ VẤN VỀ CHƯƠNG TRÌNH HỌC
          </Text>
          <Box mx={5} mt={2}>
            <Box zIndex={80}>
              {' '}
              {title && (
                <Heading as="h2" size="lg" textAlign="center" color={color} py="10px">
                  {title}
                </Heading>
              )}
              {formData.type === 'form-getfly' && <FormGetFly {...formData} />}
              {formData.type === 'form-sam' && <FormSam {...formData} />}
              {formData.type === 'form-google' && (
                <FormGoogle url={formData.url} divId={formData.divId} />
              )}
            </Box>
            <Stack
              fontSize={{ md: '22px', base: '18px' }}
              direction={'column'}
              justifyContent={'center'}
              gap={0}
              color={'#183F77'}
              lineHeight={1.2}
            >
              <Text textAlign={'center'} fontWeight={700} mx={1} zIndex={10} fontStyle="italic">
                ĐĂNG KÝ SỚM
              </Text>
              <Text
                fontStyle="italic"
                textAlign={'center'}
                fontWeight={700}
                mx={1}
                mb={4}
                zIndex={10}
              >
                TĂNG CƠ HỘI TRÚNG TUYỂN!!!
              </Text>
            </Stack>
          </Box>
        </>
      </Box>
    </>
  );
};
