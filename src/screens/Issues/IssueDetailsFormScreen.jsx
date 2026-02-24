import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import COLORS from '../../utils/constants';
import Button from '../../components/UI/Button';
import ImageSlider from '../../components/Images/ImageSlider';
import { useDispatch } from 'react-redux';
import { addIssue, updateIssue } from '../../store/slices/IssueSlice';
import { useNavigation } from '@react-navigation/native';
import { STATUS, CATEGORIES, LOCATIONS, TYPES } from '../../utils/values';
import FieldInput from '../../components/Issue/IssueDetails/FieldInput';
import FieldDropdown from '../../components/Issue/IssueDetails/FieldDropdown';

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
          <FieldInput
            label="Title"
            error={touched.title && errors.title}
            readOnly={readOnly}
            onChangeText={handleChange('title')}
            onBlur={handleBlur('title')}
            value={values.title}
            placeholder="Enter title"
          />

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

          <FieldDropdown
            label="Status"
            error={touched.status && errors.status}
            list={STATUS}
            value={values.status}
            onChange={value => setFieldValue('status', value)}
            placeholder="Select status"
          />

          <FieldDropdown
            label="Type"
            error={touched.type && errors.type}
            list={TYPES}
            value={values.type}
            onChange={value => setFieldValue('type', value)}
            placeholder="Select type"
          />

          <FieldInput
            label="Description"
            error={touched.description && errors.description}
            readOnly={readOnly}
            onChangeText={handleChange('description')}
            onBlur={handleBlur('description')}
            value={values.description}
            placeholder="Describe the issue"
            multiline
            style={[
              styles.input,
              styles.textArea,
              readOnly && styles.inputReadOnly,
            ]}
          />

          <FieldDropdown
            label="Category"
            error={touched.category && errors.category}
            list={CATEGORIES}
            value={values.category}
            onChange={value => setFieldValue('category', value)}
            placeholder="Select category"
            readOnly={readOnly}
          />

          <FieldDropdown
            label="Location"
            error={touched.location && errors.location}
            list={LOCATIONS}
            value={values.location}
            onChange={value => setFieldValue('location', value)}
            placeholder="Select location"
            readOnly={readOnly}
          />

          <FieldInput
            label="Reported By"
            error={touched.reported && errors.reported}
            readOnly={readOnly}
            onChangeText={handleChange('reported')}
            onBlur={handleBlur('reported')}
            value={values.reported}
            placeholder="Reporter name"
          />

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
  footer: {
    margin: 10,
  },
});
