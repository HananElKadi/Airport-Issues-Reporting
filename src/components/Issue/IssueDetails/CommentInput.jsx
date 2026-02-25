import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import COLORS from '../../../utils/constants';

const CommentInput = ({ placeholder = 'Comment', onComment }) => {
  const [comment, setComment] = useState('');

  const handleSend = () => {
    if (!comment.trim()) return;
    onComment?.(comment);
    setComment('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <FontAwesome name="comment-o" size={24} color={COLORS.success} />

        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={COLORS.textSecondary}
          value={comment}
          onChangeText={setComment}
        />
      </View>

      <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
        <FontAwesome name="send" size={20} color={COLORS.successBg} />
      </TouchableOpacity>
    </View>
  );
};

export default CommentInput;

const styles = StyleSheet.create({
  container: {
    // marginHorizontal: 12,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },

  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
    backgroundColor: COLORS.surfaceRaised,
    borderRadius: 30,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },

  input: {
    flex: 1,
    fontSize: 15,
    color: COLORS.textPrimary,
    paddingVertical: 0,
    marginLeft: 8,
  },

  sendButton: {
    marginLeft: 10,
    width: 45,
    height: 45,
    borderRadius: 24,
    backgroundColor: COLORS.success,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
