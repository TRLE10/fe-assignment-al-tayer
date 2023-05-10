import { Flex, RangeSlider, RangeSliderFilledTrack, RangeSliderThumb, RangeSliderTrack, Text } from '@chakra-ui/react';
import { useCallback } from 'react';

type SliderFilterProps = {
  min: number;
  max: number;
  onChange?: (values: number[]) => void;
};

const SliderFilter = ({ min, max, onChange }: SliderFilterProps) => {
  const handleChange = useCallback(
    (value: number[]) => {
      onChange && onChange(value);
    },
    [onChange]
  );

  return (
    <Flex gap={4}>
      <Text>{min}</Text>
      <RangeSlider defaultValue={[min, max / 2]} min={min} max={max} onChangeEnd={handleChange} step={5}>
        <RangeSliderTrack>
          <RangeSliderFilledTrack />
        </RangeSliderTrack>
        <RangeSliderThumb index={0} />
        <RangeSliderThumb index={1} />
      </RangeSlider>
      <Text>{max}</Text>
    </Flex>
  );
};

export default SliderFilter;
