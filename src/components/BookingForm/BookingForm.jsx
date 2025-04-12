import { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import s from "./BookingForm.module.css";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import { enUS } from "date-fns/locale"; // Імпорт локалі en-US

registerLocale("en-US", enUS);

const BookingForm = () => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateRange, setDateRange] = useState([null, null]);

  const initialValues = {
    username: "",
    email: "",
    bookingDate: "",
    comment: "",
  };

  const contactSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, "Name is too short!")
      .max(50, "Name cannot exceed 50 characters")
      .required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    bookingDate: Yup.string().required("Booking date is required"),
    comment: Yup.string(),
  });

  const handleSubmit = (value, options) => {
    console.log("Form-value", value);
    options.resetForm();
    toast.success("Form submitted successfully! 👍");
    setDateRange([null, null]); // Очищаємо обрану дату після відправки
  };

  // Форматування відображення дат
  const formatDateRange = (range) => {
    if (!range[0]) return "";
    if (!range[1]) return range[0].toLocaleDateString("uk-UA");
    const startDateStr = range[0].toLocaleDateString("uk-UA");
    const endDateStr = range[1].toLocaleDateString("uk-UA");

    if (startDateStr === endDateStr) {
      return startDateStr; // Якщо дати однакові, повертаємо лише одну дату
    }

    // Якщо дати різні, повертаємо діапазон
    return `${startDateStr} - ${endDateStr}`;
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={contactSchema}
      onSubmit={handleSubmit}
      enableReinitialize // Дозволяє оновлювати initialValues при зміні dateRange
    >
      {({ setFieldValue, values, validateForm }) => (
        <Form className={s.form}>
          <div className={s.inputGroup}>
            <Field
              type="text"
              name="username"
              placeholder="Name"
              className={s.input}
            />
            <ErrorMessage name="username" component="div" className={s.error} />
          </div>

          <div className={s.inputGroup}>
            <Field
              type="email"
              name="email"
              placeholder="Email"
              className={s.input}
            />
            <ErrorMessage name="email" component="div" className={s.error} />
          </div>

          <div className={s.inputGroup}>
            <Field
              name="bookingDate"
              // type="text"
              // placeholder="Booking date"
              // className={s.input}
              // onClick={() => setShowCalendar(!showCalendar)}
            >
              {/* {field, form, meta} */}
              {({ field }) => (
                <div className={s.datePickerWrapper}>
                  <input
                    {...field}
                    type="text"
                    placeholder="Booking date"
                    readOnly
                    onClick={() => setShowDatePicker(!showDatePicker)}
                    className={s.input}
                    value={formatDateRange(dateRange)}
                  />
                  {showDatePicker && (
                    <div className={s.datePickerContainer}>
                      <DatePicker
                        locale="en-US" // Вказуємо локаль
                        selected={dateRange[0]}
                        onChange={(dates) => {
                          const [start, end] = dates;
                          setDateRange([start, end]);
                          setFieldValue(
                            "bookingDate",
                            formatDateRange([start, end])
                          );
                          if (end) setShowDatePicker(false); // Закриваємо після вибору діапазону
                        }}
                        selectsRange
                        startDate={dateRange[0]}
                        endDate={dateRange[1]}
                        minDate={new Date()} // Заборона минулих дат
                        inline // Відображаємо календар одразу
                      />
                    </div>
                  )}
                </div>
              )}
            </Field>
            <ErrorMessage
              name="bookingDate"
              component="div"
              className={s.error}
            />
          </div>
          <div className={s.inputGroup}>
            <Field
              as="textarea"
              name="comment"
              placeholder="Comment"
              className={s.textarea}
            />
            <ErrorMessage name="comment" component="div" className={s.error} />
          </div>

          <button
            type="submit"
            className={s.btn}
            onClick={async (e) => {
              const errors = await validateForm();
              if (Object.keys(errors).length > 0) {
                e.preventDefault();
                toast.error(
                  "Please fill in all required fields: 'Name', 'Email', 'Booking date'!"
                );
              }
            }}
          >
            Send
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default BookingForm;
