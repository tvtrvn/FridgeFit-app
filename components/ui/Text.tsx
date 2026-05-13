import { Text as RNText, type TextProps as RNTextProps } from 'react-native';

import { Colors, Type } from '@/constants/theme';

type Variant = keyof typeof Type;
type ColorKey = keyof typeof Colors;

interface TextProps extends RNTextProps {
  variant?: Variant;
  color?: ColorKey | string;
}

export function Text({ variant = 'body', color, style, ...rest }: TextProps) {
  const resolved =
    color && color in Colors
      ? (Colors as Record<string, string>)[color as string]
      : (color as string | undefined) ?? Colors.text;

  return <RNText style={[Type[variant], { color: resolved }, style]} {...rest} />;
}
