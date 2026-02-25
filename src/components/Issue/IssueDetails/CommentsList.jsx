import { FlatList } from 'react-native-gesture-handler';
import CommentCard from './CommentCard';
const CommentList = props => {
  return (
    <FlatList
      data={props.data}
      renderItem={({ item }) => <CommentCard comment={item} />}
      keyExtractor={item => item.id}
      scrollEnabled={false}
    />
  );
};

export default CommentList;
