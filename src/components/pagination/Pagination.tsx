import { Box, Button, Flex } from '@chakra-ui/react';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (changedPage: number) => void;
};

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      {totalPages > 1 && (
        <Flex m={2} justifyContent={'center'}>
          <Box>
            <Button onClick={() => onPageChange(currentPage - 1)} isDisabled={currentPage === 1} size={'sm'}>
              Previous
            </Button>
            {pageNumbers.map((number) => (
              <Button key={number} onClick={() => onPageChange(number)} size={'sm'} mx={2} variant={'secondary'}>
                {number}
              </Button>
            ))}
            <Button onClick={() => onPageChange(currentPage + 1)} isDisabled={currentPage === totalPages} size={'sm'}>
              Next
            </Button>
          </Box>
        </Flex>
      )}
    </>
  );
};

export default Pagination;
