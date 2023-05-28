import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export default function ToyAddBtn() {
  return (
    <Stack spacing={2} direction="row">
      <Button className='btn-add' variant="contained"><Link to={`/toy/edit`}>Add Toy</Link></Button>
    </Stack>
  );
}