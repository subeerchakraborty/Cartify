import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';

export default function CategoriesCard({ category }) {
  return (
    <Card sx={{ minWidth: 275, boxShadow: 'none' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Avatar
          alt={category.name}
          src={category.image}
          sx={{ width: 140, height: 140 }}
        />
      </Box>
      <CardHeader title={category.name} titleTypographyProps={{ align: 'center' }} />
    </Card>
  );
}
