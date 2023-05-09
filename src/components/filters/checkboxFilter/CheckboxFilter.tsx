import { Center, Checkbox, Flex, Text } from '@chakra-ui/react';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';

type SizeFilterProps = {
  filters: string[];
  onChange: (filter: string[]) => void;
};

const CheckboxFilter = ({ onChange, filters }: SizeFilterProps) => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  useEffect(() => {
    onChange(selectedFilters);
  }, [selectedFilters.length]);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { checked, name },
    } = e;
    if (!checked) {
      setSelectedFilters((prev) => prev.filter((selectedFilter) => selectedFilter !== name));
      return;
    } else {
      setSelectedFilters((prev) => [...prev, name]);
    }
  }, []);

  return (
    <Flex>
      {filters.map((filter) => {
        return (
          <Center key={filter} flexDir={'column'} mx={4} gap={1}>
            <Checkbox name={filter} onChange={handleChange} />
            <Text>{filter}</Text>
          </Center>
        );
      })}
    </Flex>
  );
};

export default CheckboxFilter;
