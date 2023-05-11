import { Checkbox, Flex, Text } from '@chakra-ui/react';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';

type SizeFilterProps = {
  filters: string[];
  onChange: (filter: string[]) => void;
};

const CheckboxFilter = ({ onChange, filters }: SizeFilterProps) => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  useEffect(() => {
    onChange(selectedFilters);
  }, [selectedFilters, onChange]);

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
    <Flex flexWrap={'wrap'} gap={4}>
      {filters.map((filter) => {
        return (
          <Flex key={filter} flexDir={'column'}>
            <Checkbox name={filter} onChange={handleChange} aria-label={filter} />
            <Text>{filter}</Text>
          </Flex>
        );
      })}
    </Flex>
  );
};

export default CheckboxFilter;
