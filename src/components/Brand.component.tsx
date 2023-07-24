import { Typography, type TypographyProps } from '@mui/material';

export type BrandProps = TypographyProps;

export const Brand: React.FC<BrandProps> = (props) => {
  return (
    <Typography variant="h2" fontSize={24} letterSpacing={2} {...props}>
      Template
    </Typography>
  );
};
