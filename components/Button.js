import React from 'react';
import { Button } from 'react-native';

export default function ButtonComponent(props) {
  return (
    <Button {...props} style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: 100 }} />
  );
}