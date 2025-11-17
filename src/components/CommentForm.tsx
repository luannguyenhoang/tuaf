'use client';
import { emojiGroups } from '@/utils/common';
import {
  Avatar,
  Box,
  Button,
  Flex,
  Grid,
  IconButton,
  Input,
  Text,
  Textarea,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/react';
import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { FaSmile } from 'react-icons/fa';

const CommentForm = React.memo(
  ({
    initialName = '',
    initialEmail = '',
    initialContent = '',
    replyingTo,
    replyingToName,
    onSubmit,
    onCancelReply,
  }: {
    initialName?: string;
    initialEmail?: string;
    initialContent?: string;
    replyingTo: number | null;
    replyingToName?: string;
    onSubmit: (name: string, email: string, content: string) => void;
    onCancelReply: () => void;
  }) => {
    const [name, setName] = useState(initialName);
    const [email, setEmail] = useState(initialEmail);
    const [content, setContent] = useState(initialContent);
    const [website, setWebsite] = useState('');
    const [errors, setErrors] = useState<{ name?: string; email?: string; content?: string }>({});
    const [submitting, setSubmitting] = useState(false);
    const [showEmojis, setShowEmojis] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const emojiContainerRef = useRef<HTMLDivElement>(null);
    const emojiButtonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          emojiContainerRef.current &&
          emojiButtonRef.current &&
          !emojiContainerRef.current.contains(event.target as Node) &&
          !emojiButtonRef.current.contains(event.target as Node)
        ) {
          setShowEmojis(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    const validateForm = (): boolean => {
      const nextErrors: { name?: string; email?: string; content?: string } = {};
      if (!name.trim()) nextErrors.name = 'Vui lòng nhập tên';
      const emailTrimmed = email.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailTrimmed) nextErrors.email = 'Vui lòng nhập email';
      else if (!emailRegex.test(emailTrimmed)) nextErrors.email = 'Email không hợp lệ';
      if (!content.trim()) nextErrors.content = 'Vui lòng nhập nội dung bình luận';
      setErrors(nextErrors);
      return Object.keys(nextErrors).length === 0;
    };

    const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();
      if (!validateForm()) return;
      setSubmitting(true);

      try {
        await onSubmit(name.trim(), email.trim(), content.trim());
        setName(initialName);
        setEmail(initialEmail);
        setContent(initialContent);
        setErrors({});
      } finally {
        setSubmitting(false);
      }
    };

    const insertEmoji = (emoji: string) => {
      setContent((prev) => prev + emoji);
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    };

    return (
      <Box id="comment-form">
        <form onSubmit={handleSubmit}>
          {replyingTo && (
            <Flex mb={2} align="center" gap={2}>
              <Text fontSize="sm" color="gray.500">
                Đang trả lời bình luận của
              </Text>
              <Text fontSize="sm" fontWeight="bold" color="blue.500">
                {replyingToName}
              </Text>
              <Text
                fontSize="sm"
                color="gray.500"
                cursor="pointer"
                onClick={onCancelReply}
                _hover={{ textDecoration: 'underline' }}
              >
                • Hủy
              </Text>
            </Flex>
          )}

          <Flex gap={3} align="flex-start">
            <Avatar size="md" />
            <Box flex="1" position="relative">
              <Box borderWidth="1px" borderRadius="md" overflow="hidden" bg="white">
                <Textarea
                  ref={textareaRef}
                  value={content}
                  onChange={(e) => {
                    setContent(e.target.value);
                    if (errors.content) setErrors((prev) => ({ ...prev, content: undefined }));
                  }}
                  placeholder="Nhập bình luận của bạn..."
                  minH="90px"
                  p={3}
                  border="none"
                  _focus={{ border: 'none', boxShadow: 'none' }}
                  resize="vertical"
                />
                {errors.content && (
                  <Box px={3} pb={2}>
                    <Text color="red.500" fontSize="sm">
                      {errors.content}
                    </Text>
                  </Box>
                )}
              </Box>

              <Flex mt={2} align="center" gap={2} justifyContent={'space-between'}>
                <Box flex="1" minW={0}>
                  <FormControl isInvalid={!!errors.name} isRequired>
                    <Input
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                      }}
                      placeholder="tên"
                      size="sm"
                      bg="white"
                      w="80%"
                    />
                    <FormErrorMessage>{errors.name}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!errors.email} isRequired mt={2}>
                    <Input
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                      }}
                      placeholder="email"
                      type="email"
                      size="sm"
                      bg="white"
                      w="80%"
                    />
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                  </FormControl>
                </Box>
                <Box flexShrink={0} display="flex" alignItems="center">
                  <IconButton
                    ref={emojiButtonRef}
                    aria-label="Thêm emoji"
                    icon={<FaSmile />}
                    variant="outline"
                    size="sm"
                    colorScheme="gray"
                    onClick={() => setShowEmojis(!showEmojis)}
                  />
                  <Button type="submit" colorScheme="blue" size="sm" ml={4} isLoading={submitting}>
                    {replyingTo ? 'Phản hồi' : 'Đăng bình luận'}
                  </Button>
                </Box>
              </Flex>

              {showEmojis && (
                <Box
                  ref={emojiContainerRef}
                  position="absolute"
                  left="0"
                  bottom="54px"
                  mb={2}
                  width="300px"
                  maxH="250px"
                  overflowY="auto"
                  bg="white"
                  boxShadow="md"
                  borderRadius="md"
                  zIndex={10}
                >
                  <Box p={3}>
                    <Text fontWeight="bold" mb={2}>
                      Mặt cười & hình người
                    </Text>
                    <Grid templateColumns="repeat(8, 1fr)" gap={2}>
                      {emojiGroups['Mặt cười & hình người'].map((emoji, index) => (
                        <Box
                          key={index}
                          fontSize="xl"
                          cursor="pointer"
                          textAlign="center"
                          p={1}
                          borderRadius="md"
                          _hover={{ bg: 'gray.100' }}
                          onClick={() => insertEmoji(emoji)}
                        >
                          {emoji}
                        </Box>
                      ))}
                    </Grid>
                  </Box>
                </Box>
              )}
            </Box>
          </Flex>
        </form>
      </Box>
    );
  }
);

CommentForm.displayName = 'CommentForm';

export default CommentForm;
