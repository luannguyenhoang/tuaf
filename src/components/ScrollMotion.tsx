import { Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { ReactNode, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { ScrollWrapper } from './ScrollWrapper';

export const ScrollMotion = ({ children }: { children: ReactNode }) => {
  const { ref, inView } = useInView({
    threshold: 0,
  });
  return (
    <ScrollWrapper inView={inView}>
      <Box ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: '-300vh' }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0 }}
          transition={{ duration: 1 }}
        >
          {children}
        </motion.div>
      </Box>
    </ScrollWrapper>
  );
};

export const ScrollMotions = ({ children, delay = 0 }: { children: ReactNode; delay?: number }) => {
  const { ref, inView } = useInView({
    threshold: 0,
  });
  return (
    <ScrollWrapper inView={inView}>
      <Box ref={ref}>
        <motion.div
          initial={{ opacity: 0, x: '10vh' }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0 }}
          transition={{ duration: 1, delay }}
        >
          {children}
        </motion.div>
      </Box>
    </ScrollWrapper>
  );
};

export const ScrollMotionList = ({ children }: { children: ReactNode }) => {
  const { ref, inView } = useInView({
    threshold: 0,
  });
  return (
    <ScrollWrapper inView={inView}>
      <Box ref={ref}>
        <motion.div
          initial={{ opacity: 0, x: '200vh' }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0 }}
          transition={{ type: 'spring', duration: 2 }}
        >
          {children}
        </motion.div>
      </Box>
    </ScrollWrapper>
  );
};

export const ScrollMotionListBranch = ({ children }: { children: ReactNode }) => {
  const { ref, inView } = useInView({
    threshold: 0,
  });
  return (
    <ScrollWrapper inView={inView}>
      <Box ref={ref}>
        <motion.div
          initial={{ opacity: 0, x: '100vh' }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0 }}
          transition={{ type: 'spring', duration: 1 }}
        >
          {children}
        </motion.div>
      </Box>
    </ScrollWrapper>
  );
};

export const ScrollView = ({ children }: { children: ReactNode }) => {
  const [isVisible, setIsVisible] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.5, // Kích hoạt khi 50% của phần tử hiển thị trong viewport
  });

  useEffect(() => {
    // Kiểm tra xem trongView và isVisible đều là true
    if (inView && !isVisible) {
      setIsVisible(true); // Nếu không thì hiển thị
    }
  }, [inView, isVisible]);
  return <Box ref={ref}>{isVisible && <>{children}</>}</Box>;
};

export const JumpingElement = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => (
  <motion.div
    style={{ position: 'relative' }} // Ensures it starts from the exact place with no extra movement
    animate={{ y: [0, -10, 0] }}
    transition={{
      duration: 1.5,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatDelay: 1, // Extra delay before repeating
      delay: delay + 0.1, // Small offset to give page time to load
    }}
  >
    {children}
  </motion.div>
);
export const JumpingElementX = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => (
  <motion.div
    style={{ position: 'relative' }} // Ensures it starts from the exact place with no extra movement
    animate={{ x: [0, -10, 0] }}
    transition={{
      duration: 1.5,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatDelay: 1, // Extra delay before repeating
      delay: delay + 0.1, // Small offset to give page time to load
    }}
  >
    {children}
  </motion.div>
);
