import React from 'react';
import { Text, TextInput } from 'react-native';

export default function InputBox(props) {
  return (
    <TextInput {...props} style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: 100 }} />
  );
}