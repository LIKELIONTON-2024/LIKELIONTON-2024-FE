import { Image, Text, TouchableOpacity, View } from 'react-native';
export const Button = ({ bgColor, onPress, text, color, icon }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: 325,
        height: 51,
        backgroundColor: bgColor,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      {icon ? (
        <>
          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            <Image
              source={icon}
              style={{ width: 19, height: 18, marginRight: 11 }}
            />
          </View>
          <Text
            style={{
              flex: 2,
              alignItems: 'center',
              fontSize: 17,
              fontWeight: 'medium',
              color,
            }}
          >
            {text}
          </Text>
        </>
      ) : (
        <Text
          style={{
            alignItems: 'center',
            fontSize: 17,
            fontWeight: 'medium',
            color,
          }}
        >
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
};
