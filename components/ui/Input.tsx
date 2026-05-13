import { forwardRef } from 'react';
import { StyleSheet, TextInput, View, type TextInputProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Colors, Radii, Spacing, Type } from '@/constants/theme';

interface InputProps extends TextInputProps {
  leftIcon?: keyof typeof Ionicons.glyphMap;
  rightElement?: React.ReactNode;
}

export const Input = forwardRef<TextInput, InputProps>(
  ({ leftIcon, rightElement, style, ...rest }, ref) => {
    return (
      <View style={styles.wrap}>
        {leftIcon ? (
          <Ionicons name={leftIcon} size={18} color={Colors.textMuted} style={styles.leftIcon} />
        ) : null}
        <TextInput
          ref={ref}
          placeholderTextColor={Colors.textMuted}
          style={[styles.input, leftIcon ? styles.inputWithLeftIcon : null, style]}
          {...rest}
        />
        {rightElement ? <View style={styles.right}>{rightElement}</View> : null}
      </View>
    );
  },
);

Input.displayName = 'Input';

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceElevated,
    borderRadius: Radii.lg,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  leftIcon: { marginLeft: Spacing.lg },
  inputWithLeftIcon: { paddingLeft: Spacing.sm },
  input: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    ...Type.body,
    color: Colors.text,
  },
  right: { paddingRight: Spacing.sm },
});
