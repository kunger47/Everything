// import 'react-day-picker/lib/style.css';
import './dates.scss';

// import { ForwardedRef, forwardRef, useEffect, useState } from 'react';
// import { Form, InputGroup } from 'react-bootstrap';
// import DayPickerInput from 'react-day-picker/DayPickerInput';
// import { getDateDisplayFormatFromDate, getTodaysDate, tryParseDateFromString } from 'services/date';

// interface Props {
//     value: Date | undefined;
//     placeholder: string;
//     handleDateUpdate: (updatedDate: Date) => void;

//     label?: string | null;
//     calendarStartDate?: Date;
//     isDisabled?: boolean;
//     error?: string;
//     showErrorMessage?: boolean;
//     helpText?: string;
//     tabIndex?: number;
//     className?: string;
//     workWeekStartDay?: string;
//     focusOnDate?: () => void;
// }

// const DatePicker = forwardRef((props: Props, ref: ForwardedRef<DayPickerInput>) => {
//     const [calendarStart, setCalendarStart] = useState<Date>(props.calendarStartDate || getTodaysDate());

//     useEffect(() => {
//         !!props.focusOnDate && props.focusOnDate();
//     }, [props.focusOnDate]);

//     const getDateValue = (date?: Date) => {
//         return date ? new Date(date) : undefined;
//     }

//     const getDateDisplay = (date: Date | undefined) => {
//         if (date === null || date === undefined)
//             return undefined;

//         let jsDate = new Date(date);
//         if (isNaN(jsDate.getTime()))
//             return date;
//         return getDateDisplayFormatFromDate(jsDate)
//     }

//     let parsedDate = getDateValue(props.value);

//     useEffect(() => {
//         !!parsedDate && setCalendarStart(parsedDate);
//     }, [props.value]);

//     const handleDateChange = (from: Date) => {
//         props.handleDateUpdate(from);
//     }

//     const handleHide = () => {
//         if (parsedDate === null || parsedDate === undefined || isNaN(parsedDate.getTime()))
//             props.handleDateUpdate(new Date());
//     }

//     const formatDate = (date: Date) => {
//         return getDateDisplayFormatFromDate(date);
//     }

//     const parseDate = (str: string, format: string) => {
//         let parsedDate = tryParseDateFromString(str, format);
//         return parsedDate || undefined;
//     }

//     return (
//         <Form.Group className={props.className}>
//             {props.label &&
//                 <Form.Label>{props.label}</Form.Label>
//             }
//             <InputGroup>
//                 <Form.Control
//                     hidden={true}
//                     isInvalid={!!props.error && props.showErrorMessage} >
//                 </Form.Control>
//                 <DayPickerInput
//                     value={getDateDisplay(props.value)}
//                     placeholder={props.placeholder}
//                     format="LL/dd/yyyy"
//                     formatDate={formatDate}
//                     parseDate={parseDate}
//                     inputProps={{ className: `form-control${!!props.error && props.showErrorMessage ? ' error' : ''}`, name: 'date', role: 'date', disabled: props.isDisabled, tabIndex: props.tabIndex, autoComplete: 'off' }}
//                     onDayChange={handleDateChange}
//                     onDayPickerHide={handleHide}
//                     ref={ref}
//                     dayPickerProps={{
//                         month: calendarStart
//                     }}
//                 />
//                 {props.helpText && <Form.Text className="text-muted">{props.helpText}</Form.Text>}
//                 {!!props.error && props.showErrorMessage &&
//                     <Form.Control.Feedback type="invalid">
//                         {props.error}
//                     </Form.Control.Feedback>
//                 }
//             </InputGroup>
//         </Form.Group>
//     );
// });

// export default DatePicker;