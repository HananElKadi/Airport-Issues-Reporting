import { StyleSheet, Text, View, Modal } from 'react-native';
import React, { useEffect, useState } from 'react';
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';
import LoadingSpinner from '../UI/LoadingSpinner';

const AiOutputModal = ({ visible, onAccept, onReject }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  async function getDataFromAi() {
    try {
      // simulate AI processing
      await new Promise(resolve => setTimeout(resolve, 1500));

      return {
        title: 'Broken Escalator',
        category: 'Safety',
        description:
          'The escalator near Gate A3 is not working and causing congestion.',
      };
    } catch (err) {
      throw new Error('Failed to analyze images');
    }
  }

  useEffect(() => {
    if (!visible) return;

    async function fetchData() {
      setIsLoading(true);
      setError(null);

      try {
        const result = await getDataFromAi();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [visible]);

  if (isLoading) {
    return <LoadingSpinner message="Analyzing Images..." />;
  }

  if (error) {
    return <ErrorModal message={error} />;
  }

  if (!data) {
    return null;
  }

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.backdrop}>
        <View style={styles.modalContainer}>
          <Text style={styles.heading}>AI Analysis Result</Text>

          <View style={styles.field}>
            <Text style={styles.label}>Title</Text>
            <Text style={styles.value}>{data.title}</Text>
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Category</Text>
            <Text style={styles.value}>{data.category}</Text>
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Description</Text>
            <Text style={styles.value}>{data.description}</Text>
          </View>

          <View style={styles.actions}>
            <Button
              title="Reject"
              style={styles.rejectBtn}
              onPress={onReject}
            />
            <Button
              title="Accept"
              style={styles.acceptBtn}
              onPress={() => onAccept(data)}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AiOutputModal;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContainer: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },

  heading: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 16,
    color: '#111',
  },

  field: {
    marginBottom: 12,
  },

  label: {
    fontSize: 13,
    fontWeight: '500',
    color: '#666',
    marginBottom: 4,
  },

  value: {
    fontSize: 15,
    color: '#222',
    lineHeight: 20,
  },

  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },

  rejectBtn: {
    flex: 1,
    marginRight: 8,
  },

  acceptBtn: {
    flex: 1,
    marginLeft: 8,
  },
});
