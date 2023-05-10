const Button = {
  baseStyle: {
    borderRadius: 'lg',
    fontWeight: 600,
    type: 'button',
  },
  sizes: {
    sm: {
      minW: 24,
      h: 7,
      px: 7,
      py: 3,
      fontSize: 'xs',
    },
    md: {
      minW: 32,
      h: 8,
      px: 7,
      py: 3,
      fontSize: 'sm',
    },
    lg: {
      minW: 36,
      h: 10,
      px: 7,
      py: 3,
      fontSize: 'md',
      lineHeight: 6,
    },
  },
  variants: {
    primary: {
      bg: 'primary.500',
      color: 'white',
      _hover: {
        bg: 'primary.300',
        _disabled: {
          backgroundColor: 'primary.500',
        },
      },
    },
    secondary: {
      bg: 'neutrals.100',
      color: 'primary.500',
      minW: 'fit-content',
      _hover: {
        bg: 'neutrals.50',
        _disabled: {
          backgroundColor: 'neutrals.200',
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
