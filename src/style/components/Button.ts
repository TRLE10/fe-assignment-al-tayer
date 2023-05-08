const Button = {
  baseStyle: {
    borderRadius: 'lg',
    fontWeight: 600,
    mx: 'auto',
    type: 'button',
  },
  sizes: {
    sm: {
      minW: 24,
      h: 9,
      px: 7,
      py: 3,
      fontSize: 'xs',
    },
    md: {
      minW: 32,
      h: 10,
      px: 7,
      py: 3,
      fontSize: 'sm',
    },
    lg: {
      minW: 36,
      h: 12,
      px: 7,
      py: 3,
      fontSize: 'md',
      lineHeight: 6,
    },
  },
  variants: {
    primary: {
      bg: 'primary.500',
      backgroundColor: 'primary.500',
      color: 'white',
      _hover: {
        bg: 'primary.300',
        backgroundColor: 'primary.300',
        _disabled: {
          backgroundColor: 'primary.500',
        },
      },
    },
  },
  defaultProps: {
    size: 'lg',
    variant: 'primary',
  },
};

export default Button;
