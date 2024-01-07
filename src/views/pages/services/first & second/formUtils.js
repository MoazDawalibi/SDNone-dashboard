import * as Yup from "yup";
import { mapTranslatedProperties } from "helpers/language";
import { buildFormData } from "api/helpers";

export const getInitialValues = (objectToEdit = null) => {

  return {
    translated_fields: {
      1: {
        title:
          mapTranslatedProperties(
            objectToEdit?.translations,
            "title",
            'en'
          ) || "",
          description:
          mapTranslatedProperties(
            objectToEdit?.translations,
            "description",
            'en'
          ) || "",
      },
      2: {
        title:
          mapTranslatedProperties(
            objectToEdit?.translations,
            "title",
            'ar'
          ) || "",
          description:
          mapTranslatedProperties(
            objectToEdit?.translations,
            "description",
            'ar'
          ) || "",
      },
    },
  };
};

export const getValidationSchema = (editMode = false) => {
  return Yup.object().shape({
    translated_fields: Yup.object({
      1: Yup.object({
        title: Yup.string().required("required"),
        description: Yup.string().required("required"),

      }),
      2: Yup.object({
        title: Yup.string().required("required"),
        description: Yup.string().required("required"),

      }),
    }),

  });
};

