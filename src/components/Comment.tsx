'use client';
import { CommentPost } from '@/types/types';
import { countAllComments, processComments } from '@/utils/common';
import { Box, Flex, Text, useToast, VStack } from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import CommentSkeleton from './CommentSkeleton';

export default function CommentsPost({ slug }: { slug: string }) {
  const [data, setData] = useState<CommentPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [pendingComment, setPendingComment] = useState<{
    author_name: string;
    content: string;
    date: string;
  } | null>(null);
  const toast = useToast();

  const [expandAll, setExpandAll] = useState(false);

  const toggleAllComments = () => {
    setExpandAll(!expandAll);
  };

  const fetchComments = useCallback(async () => {
    try {
      setLoading(true);
      const apiUrl = `${process.env.NEXT_PUBLIC_API_POSTS_URL}${slug}&per_page=100`;
      const res = await fetch(apiUrl, { next: { revalidate: 0 } });

      if (!res.ok) {
        throw new Error('error');
      }

      const allComments = await res.json();
      setData(processComments(allComments));
    } catch (err: any) {
      setError(err.message || 'error');
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleCommentSuccess = async () => {
    await fetchComments();
    setReplyingTo(null);
    setPendingComment(null);

    setExpandAll(false);

    toast({
      title: 'Thành công',
      description: 'Bình luận của bạn đã được gửi đang chờ phê duyệt',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };

  const handleSubmitCommentForm = async (
    name: string,
    email: string,
    content: string
  ): Promise<boolean> => {
    try {
      // Tạo item chờ duyệt hiển thị ngay cho người dùng
      setPendingComment({
        author_name: name.trim() === '' ? 'Ẩn danh' : name,
        content,
        date: new Date().toISOString(),
      });

      const commentData: Record<string, any> = {
        post: parseInt(slug),
        author_name: name.trim() === '' ? 'Ẩn danh' : name,
        content: content,
        parent: replyingTo ? replyingTo : 0,
      };

      if (email && email.trim() !== '') {
        commentData.author_email = email.trim();
      }

      const response = await fetch('/api/postComment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Không thể gửi bình luận');
      }

      await response.json();
      await handleCommentSuccess();

      return true;
    } catch (err: any) {
      setPendingComment(null);
      toast({
        title: 'Lỗi',
        description: err.message || 'Có lỗi xảy ra khi gửi bình luận',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return false;
    }
  };

  const handleReply = (commentId: number) => {
    setReplyingTo(commentId);
    const formElement = document.getElementById('comment-form');
    formElement?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCancelReply = () => {
    setReplyingTo(null);
  };

  if (loading) {
    return (
      <Box>
        <Flex justify="space-between" align="center" mb={4}>
          <Box
            width="150px"
            height="24px"
            bg="gray.200"
            borderRadius="md"
            animation="pulse 1.5s infinite"
          />
        </Flex>
        <CommentSkeleton />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={4} bg="red.50" color="red.500" borderRadius="md">
        <Text>{error}</Text>
      </Box>
    );
  }

  return (
    <VStack spacing={4} align="stretch" my={6}>
      <Flex justify="space-between" align="center" mb={4}>
        {data && data.length > 3 && (
          <Text
            fontSize="sm"
            color="blue.500"
            cursor="pointer"
            onClick={toggleAllComments}
            _hover={{ textDecoration: 'underline' }}
          >
            {expandAll ? 'Thu gọn tất cả' : 'Xem tất cả'}
          </Text>
        )}
      </Flex>

      {!replyingTo && (
        <CommentForm
          replyingTo={null}
          onSubmit={handleSubmitCommentForm}
          onCancelReply={handleCancelReply}
        />
      )}
      <Text fontSize="lg" fontWeight="bold">
        {(data.length > 0 ? countAllComments(data) : 0) + (pendingComment ? 1 : 0)} GÓP Ý
      </Text>
      {data && data.length > 0 ? (
        <VStack spacing={4} align="stretch">
          {data.map((comment, index) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              replyingTo={replyingTo}
              replyingToName={
                replyingTo ? data.find((c) => c.id === replyingTo)?.author_name : undefined
              }
              onReply={handleReply}
              onSubmitComment={handleSubmitCommentForm}
              onCancelReply={handleCancelReply}
              parentExpanded={expandAll}
              isLastChild={index === data.length - 1}
            />
          ))}
          {pendingComment && (
            <Box>
              <Flex gap={2}>
                {/* Avatar giữ mặc định */}
                <Box boxSize="32px" borderRadius="full" bg="gray.200" />
                <Box flex="1">
                  <Box bg="gray.50" p={3} borderRadius="xl">
                    <Text fontWeight="semibold" fontSize="md">
                      {pendingComment.author_name}
                      <Text as="span" color="orange.400" fontWeight="normal" ml={2}>
                        ● Đang chờ phê duyệt
                      </Text>
                    </Text>
                    <Box mt={1} fontSize="md" color="gray.700">
                      {pendingComment.content}
                    </Box>
                  </Box>
                  <Flex mt={1} gap={4} ml={2}>
                    <Text fontSize="sm" color="gray.500">
                      Vừa xong
                    </Text>
                  </Flex>
                </Box>
              </Flex>
            </Box>
          )}
        </VStack>
      ) : (
        <>
          {pendingComment ? (
            <VStack spacing={4} align="stretch">
              <Box>
                <Flex gap={2}>
                  <Box boxSize="32px" borderRadius="full" bg="gray.200" />
                  <Box flex="1">
                    <Box bg="gray.50" p={3} borderRadius="xl">
                      <Text fontWeight="semibold" fontSize="md">
                        {pendingComment.author_name}
                        <Text as="span" color="orange.400" fontWeight="normal" ml={2}>
                          ● Đang chờ phê duyệt
                        </Text>
                      </Text>
                      <Box mt={1} fontSize="md" color="gray.700">
                        {pendingComment.content}
                      </Box>
                    </Box>
                    <Flex mt={1} gap={4} ml={2}>
                      <Text fontSize="sm" color="gray.500">
                        Vừa xong
                      </Text>
                    </Flex>
                  </Box>
                </Flex>
              </Box>
            </VStack>
          ) : (
            <Text color="gray.500" textAlign="center" py={4}>
              Chưa có bình luận nào.
            </Text>
          )}
        </>
      )}
    </VStack>
  );
}
