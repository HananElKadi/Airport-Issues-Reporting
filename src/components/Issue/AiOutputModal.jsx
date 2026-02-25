import { StyleSheet, Text, View, Modal } from 'react-native';
import React, { useEffect, useState } from 'react';
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';
import LoadingSpinner from '../UI/LoadingSpinner';
import uploadImage from '../../services/aiReasonningApi';
import COLORS from '../../utils/constants';

const DataField = ({ label, value }) => (
  <View style={styles.field}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const AiOutputModal = ({ visible, onAccept, onReject, images }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const uploadImages = async images => {
    try {
      const result = await uploadImage(images);
      console.log('Upload successful:', result);
      return result;
    } catch (error) {
      console.error('Upload failed:', error);
      throw error;
    }
  };

  useEffect(() => {
    if (!images || images.length === 0) return;

    const handleUpload = async () => {
      setIsLoading(true);
      setError(null);
      setData(null);
      try {
        const res = await uploadImages(images);
        setData(res);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    handleUpload();
  }, [images]);

  if (isLoading) {
    return <LoadingSpinner message="Analyzing Images..." />;
  }

  if (error) {
    return (
      <ErrorModal
        visible={true}
        message={error}
        onClose={() => {
          setError(null);
          onReject();
        }}
      />
    );
  }

  if (
    !error &&
    (!data || (!data.title && !data.category && !data.description))
  ) {
    return (
      <Modal visible={visible} transparent animationType="fade">
        <View style={styles.backdrop}>
          <View style={styles.modalContainer}>
            <Text style={styles.heading}>Fail in Getting Data</Text>
            <View style={styles.actions}>
              <Button
                title="Continue"
                style={styles.rejectBtn}
                onPress={onReject}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.backdrop}>
        <View style={styles.modalContainer}>
          <Text style={styles.heading}>AI Analysis Result</Text>

          <DataField label="Title" value={data.title} />
          <DataField label="Category" value={data.category} />
          <DataField label="Description" value={data.description} />

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

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: COLORS.hoverBg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: COLORS.backgroundAlt,
    borderRadius: 16,
    padding: 20,
    elevation: 6,
    shadowColor: COLORS.shadowColor,
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  heading: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 16,
    color: COLORS.accent100,
  },
  field: {
    marginBottom: 12,
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.textTertiary,
    marginBottom: 4,
  },
  value: {
    fontSize: 15,
    color: COLORS.textInverse,
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
    backgroundColor: COLORS.surface,
  },
  acceptBtn: {
    flex: 1,
    marginLeft: 8,
    backgroundColor: COLORS.surface,
  },
});

export default AiOutputModal;
