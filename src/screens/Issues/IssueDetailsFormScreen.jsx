import React from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import COLORS from '../../utils/constants';
import Button from '../../components/UI/Button';
import ImageSlider from '../../components/Images/ImageSlider';
import CustomDropDown from '../../components/UI/CustomDropdown';
import { useDispatch } from 'react-redux';
import { addIssue, updateIssue } from '../../store/slices/IssueSlice';
import { useNavigation } from '@react-navigation/native';
import { STATUS, CATEGORIES, LOCATIONS, TYPES } from '../../utils/values';

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
    navigation.canGoBack() && navigation.goBack();
  };

  return (
    <Formik
      enableReinitialize
      initialValues={{
        title: item.title || '',
        description: item.description || '',
        status: item.status || STATUS[0],
        category: item.category || '',
        type: item.type || TYPES[0],
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
          <View style={styles.field}>
            <Text style={styles.label}>Title</Text>
            <View style={styles.valueRow}>
              <TextInput
                style={[styles.input, readOnly && styles.inputReadOnly]}
                onChangeText={handleChange('title')}
                onBlur={handleBlur('title')}
                value={values.title}
                placeholder="Enter title"
                placeholderTextColor={COLORS.accent200}
                editable={!readOnly}
              />
            </View>

            {errors.title && touched.title && !readOnly && (
              <Text style={styles.error}>{errors.title}</Text>
            )}
          </View>

          <View style={styles.fieldVertical}>
            <Text style={styles.label}>Photos</Text>

            <ImageSlider
              images={values.images}
              readOnly={readOnly}
              onImageEdited={(index, newImagePath) => {
                const updatedImages = [...values.images];
                updatedImages[index] = newImagePath;
                setFieldValue('images', updatedImages);
              }}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Status</Text>
            <View style={styles.valueRow}>
              <CustomDropDown
                list={STATUS}
                value={values.status}
                onChange={value => setFieldValue('status', value)}
                placeholder="Select status"
                readOnly={false}
              />
            </View>
            {errors.status && touched.status && (
              <Text style={styles.error}>{errors.status}</Text>
            )}
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Type</Text>
            <View style={styles.valueRow}>
              <CustomDropDown
                list={TYPES}
                value={values.type}
                onChange={value => setFieldValue('type', value)}
                placeholder="Select type"
                readOnly={false}
              />
            </View>

            {errors.type && touched.type && (
              <Text style={styles.error}>{errors.type}</Text>
            )}
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Description</Text>
            <View style={styles.valueRow}>
              <TextInput
                style={[
                  styles.input,
                  styles.textArea,
                  readOnly && styles.inputReadOnly,
                ]}
                onChangeText={handleChange('description')}
                onBlur={handleBlur('description')}
                value={values.description}
                placeholder="Describe the issue"
                placeholderTextColor={COLORS.accent200}
                multiline
                editable={!readOnly}
              />
            </View>

            {errors.description && touched.description && !readOnly && (
              <Text style={styles.error}>{errors.description}</Text>
            )}
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Category</Text>
            <View style={styles.valueRow}>
              <CustomDropDown
                list={CATEGORIES}
                value={values.category}
                onChange={value => setFieldValue('category', value)}
                placeholder="Select category"
                readOnly={readOnly}
              />
            </View>

            {errors.category && touched.category && (
              <Text style={styles.error}>{errors.category}</Text>
            )}
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Location</Text>
            <View style={styles.valueRow}>
              <CustomDropDown
                list={LOCATIONS}
                value={values.location}
                onChange={value => setFieldValue('location', value)}
                placeholder="Select location"
                readOnly={readOnly}
              />
            </View>

            {errors.location && touched.location && (
              <Text style={styles.error}>{errors.location}</Text>
            )}
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Reported By</Text>
            <View style={styles.valueRow}>
              <TextInput
                style={[styles.input, readOnly && styles.inputReadOnly]}
                onChangeText={handleChange('reported')}
                onBlur={handleBlur('reported')}
                value={values.reported}
                placeholder="Reporter name"
                placeholderTextColor={COLORS.accent200}
                editable={!readOnly}
              />
            </View>

            {errors.reported && touched.reported && (
              <Text style={styles.error}>{errors.reported}</Text>
            )}
          </View>

          {!item.id && <Button title="Submit Issue" onPress={handleSubmit} />}
          {item.id && <Button title="Update Issue" onPress={handleSubmit} />}
          <View style={styles.footer} />
        </ScrollView>
      )}
    </Formik>
  );
};

export default IssueDetailsFormScreen;

const styles = StyleSheet.create({
  container: {
    padding: 0,
    flex: 1,
    backgroundColor: COLORS.backgroundAlt,
  },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.hoverBg,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  fieldVertical: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.hoverBg,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 18,
    color: COLORS.textInverse,
    width: 120,
    fontWeight: '400',
  },
  valueRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  input: {
    flex: 1,
    fontSize: 15,
    color: COLORS.primary100,
    padding: 0,
  },
  inputReadOnly: {
    color: COLORS.disabledText,
  },
  textArea: {
    textAlignVertical: 'top',
  },
  error: {
    marginTop: 4,
    fontSize: 12,
    color: COLORS.error,
  },
  footer: {
    margin: 10,
  },
});
