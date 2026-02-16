import React from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import { Picker } from '@react-native-picker/picker';
import * as Yup from 'yup';
import COLORS from '../../utils/constants';
import Button from '../../components/UI/Button';
import ImageSlider from '../../components/Images/ImageSlider';
import { useDispatch } from 'react-redux';
import { addIssue, updateIssue } from '../../store/slices/IssueSlice';
import { useNavigation } from '@react-navigation/native';

const IssueSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  status: Yup.string().required('Status is required'),
  category: Yup.string().required('Category is required'),
  location: Yup.string().required('Location is required'),
  reported: Yup.string().required('Reported by is required'),
});

const IssueDetailsFormScreen = props => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { item = {}, readOnly = false } = props.route.params || {};
  const submitHandler = values => {
    dispatch(addIssue(values));
    navigation.navigate('Issues');
  };

  const updateHandler = values => {
    dispatch(updateIssue({ id: item.id, data: values }));
    console.log('updated');
    navigation.navigate('Issues');
  };

  return (
    <Formik
      enableReinitialize
      initialValues={{
        title: item.title || '',
        description: item.description || '',
        status: item.status || 'Open',
        category: item.category || '',
        location: item.location || '',
        reported: item.reported || '',
        images: item.images || [],
      }}
      validationSchema={IssueSchema}
      onSubmit={values => {
        if (item.id) updateHandler(values);
        else submitHandler(values);
      }}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        setFieldValue,
      }) => (
        <ScrollView style={styles.container}>
          {/* Pass both images and edits to ImageSlider */}
          <ImageSlider
            images={values.images}
            readOnly={readOnly}
            onImageEdited={(index, newImagePath) => {
              const updatedImages = [...values.images];
              updatedImages[index] = newImagePath;
              setFieldValue('images', updatedImages);
            }}
          />

          <View style={styles.field}>
            <Text style={styles.label}>Title</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('title')}
              onBlur={handleBlur('title')}
              value={values.title}
              placeholder="Enter title"
              placeholderTextColor={COLORS.placeholder}
              editable={!readOnly}
            />
            {errors.title && touched.title && !readOnly && (
              <Text style={styles.error}>{errors.title}</Text>
            )}
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              onChangeText={handleChange('description')}
              onBlur={handleBlur('description')}
              value={values.description}
              placeholder="Describe the issue"
              placeholderTextColor={COLORS.placeholder}
              multiline
              editable={!readOnly}
            />
            {errors.description && touched.description && !readOnly && (
              <Text style={styles.error}>{errors.description}</Text>
            )}
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Status</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={values.status}
                onValueChange={value => setFieldValue('status', value)}
                enabled={!readOnly}
              >
                <Picker.Item label="Open" value="Open" />
                <Picker.Item label="In Progress" value="In-Progress" />
                <Picker.Item label="Resolved" value="Resolved" />
              </Picker>
            </View>
            {errors.status && touched.status && (
              <Text style={styles.error}>{errors.status}</Text>
            )}
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Category</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={values.category}
                onValueChange={value => setFieldValue('category', value)}
                enabled={!readOnly}
              >
                <Picker.Item label="Select category" value="" />
                <Picker.Item label="Electrical" value="Electrical" />
                <Picker.Item label="Plumbing" value="Plumbing" />
                <Picker.Item label="Janitorial" value="Janitorial" />
                <Picker.Item label="Structural" value="Structural" />
                <Picker.Item label="Safety" value="Safety" />
                <Picker.Item label="IT / Systems" value="IT" />
              </Picker>
            </View>
            {errors.category && touched.category && (
              <Text style={styles.error}>{errors.category}</Text>
            )}
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Location</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={values.location}
                onValueChange={value => setFieldValue('location', value)}
                enabled={!readOnly}
              >
                <Picker.Item label="Select location" value="" />
                <Picker.Item
                  label="Terminal 1 – Gate A12"
                  value="Terminal 1, Gate A12"
                />
                <Picker.Item
                  label="Terminal 1 – Security Checkpoint C"
                  value="Terminal 1, Security Checkpoint C"
                />
                <Picker.Item
                  label="Terminal 2 – Food Court"
                  value="Terminal 2, Food Court"
                />
                <Picker.Item
                  label="Terminal 2 – Restrooms (Concourse B)"
                  value="Terminal 2, Restrooms, Concourse B"
                />
                <Picker.Item
                  label="Terminal 3 – Arrival Hall"
                  value="Terminal 3, Arrival Hall"
                />
                <Picker.Item
                  label="Baggage Claim – Carousel Area"
                  value="Baggage Claim, Carousel Area"
                />
              </Picker>
            </View>
            {errors.location && touched.location && (
              <Text style={styles.error}>{errors.location}</Text>
            )}
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Reported By</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('reported')}
              onBlur={handleBlur('reported')}
              value={values.reported}
              placeholder="Reporter name"
              placeholderTextColor={COLORS.placeholder}
              editable={!readOnly}
            />
            {errors.reported && touched.reported && (
              <Text style={styles.error}>{errors.reported}</Text>
            )}
          </View>

          {!item.id && <Button title="Submit Issue" onPress={handleSubmit} />}
          {/* {item.id && <Button title="Update Issue" onPress={handleSubmit} />} */}
          <View style={{ margin: 20 }}></View>
        </ScrollView>
      )}
    </Formik>
  );
};

export default IssueDetailsFormScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },

  header: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 20,
    color: COLORS.textPrimary,
  },

  field: {
    marginBottom: 16,
  },

  label: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: 6,
  },

  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: COLORS.surface,
    fontSize: 15,
    color: COLORS.textPrimary,
  },

  textArea: {
    height: 110,
    textAlignVertical: 'top',
  },

  pickerWrapper: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: COLORS.surface,
  },

  error: {
    marginTop: 4,
    fontSize: 12,
    color: COLORS.error,
  },

  submitButton: {
    marginTop: 10,
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },

  submitText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
});
