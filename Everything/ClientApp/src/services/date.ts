import { DateTime, Interval } from "luxon";
const DATE_URL_FORMAT = 'yyyy-LL-dd';
const DATE_DISPLAY_FORMAT = 'LL/dd/yyyy';
const FULL_DATE_DISPLAY_FORMAT = 'LLL d, yyyy';
const CHART_DISPLAY_FORMAT = "LLL yyyy";

export class DateRange {
    StartDate: Date = getTodaysDate();
    EndDate: Date = getTodaysDate();

    constructor(init?: Partial<DateRange>) {
        Object.assign(this, init);
    }
}

export function getTodaysDate(): Date {
    return DateTime.now().toJSDate();
}

export function getDatesYear(date: Date | string): number {
    let jsDate = new Date(date);
    return jsDate.getFullYear();
}

export function getCurrentYear(): number {
    return getTodaysDate().getFullYear();
}

export function parseDateFromString(dateString: string, format: string): Date {
    return DateTime.fromFormat(dateString, format).toJSDate();
}

export function tryParseDateFromString(dateString: string, format: string): Date | null {
    let parsedDate = DateTime.fromFormat(dateString, format);
    if (parsedDate.isValid)
        return parsedDate.toJSDate();
    else
        return null;
}

export function getDayStart(date: Date): Date {
    return DateTime.fromJSDate(date).startOf('day').toJSDate();
}

export function getDayEnd(date: Date): Date {
    return DateTime.fromJSDate(date).endOf('day').toJSDate();
}

export function getMonthStart(date: Date): Date {
    return DateTime.fromJSDate(date).startOf('month').toJSDate();
}

export function getMonthEnd(date: Date): Date {
    return DateTime.fromJSDate(date).endOf('month').toJSDate();
}

export function getDayCount(startDate: Date | string, endDate: Date | string) {
    let jsStartDate = new Date(startDate);
    let jsEndDate = new Date(endDate);
    let interval = Interval.fromDateTimes(jsStartDate, jsEndDate);
    return interval.count('days');
}

export function getDateURLFormat(date: Date): string {
    return DateTime.fromJSDate(date).toFormat(DATE_URL_FORMAT);
}

export function getDateDisplayFormat(date: string): string {
    return DateTime.fromISO(date).toFormat(DATE_DISPLAY_FORMAT);
}

export function getFullDateDisplayFormat(date: string): string {
    return DateTime.fromISO(date).toFormat(FULL_DATE_DISPLAY_FORMAT);
}

export function getDisplayDateRange(dateRange: DateRange): string {
    return DateTime.fromJSDate(dateRange.StartDate).toFormat(FULL_DATE_DISPLAY_FORMAT)
        + " - "
        + DateTime.fromJSDate(dateRange.EndDate).toFormat(FULL_DATE_DISPLAY_FORMAT);
}

// export function getDaysInRange(dateRange: DateRange): number[] {
//     var dates: number[] = [];
//     let date = new Date(dateRange.StartDate);
//     while (date <= dateRange.EndDate) {
//         dates.push(date.getDate());
//         date = AddDuration(date, 1, "days");
//     }
//     return dates;
// }

// export function getDatesInRange(dateRange: DateRange): Date[] {
//     var dates: Date[] = [];
//     let date = new Date(dateRange.StartDate);
//     while (date <= dateRange.EndDate) {
//         dates.push(date);
//         date = AddDuration(date, 1, "days");
//     }
//     return dates;
// }

export function numberOfDaysBetween(startDate: Date, endDate: Date): number {
    return Math.floor(Interval.fromDateTimes(startDate, endDate).length("days"));
}

export function daysSinceDisplay(date: string | null): string {
    if (!date)
        return '';
    var duration = DateTime.fromISO(date).diffNow(["years", "months", "days", "hours", 'minutes']);
    if (Math.abs(duration.years) > 0)
        return getDaysSinseDisplay(Math.abs(duration.years), 'year');
    if (Math.abs(duration.months) > 0)
        return getDaysSinseDisplay(Math.abs(duration.months), 'month');
    if (Math.abs(duration.days) > 0)
        return getDaysSinseDisplay(Math.abs(duration.days), 'day');
    if (Math.abs(duration.hours) > 0)
        return getDaysSinseDisplay(Math.abs(duration.hours), 'hour');
    if (Math.abs(duration.minutes) > 0)
        return getDaysSinseDisplay(Math.abs(Math.round(duration.minutes)), 'minute');
    return 'Less than a minute ago';
}

function getDaysSinseDisplay(value: number, displayName: string) {
    return `${value} ${displayName}${value > 1 ? 's' : ''} ago`;
}

export function getLocalDateFromFormat(date: string, format: string): Date {
    let strippedDate = date.split("T")[0];
    return DateTime.fromFormat(strippedDate, format, { zone: "local" }).toJSDate();
}

export function getDateDisplayFormatFromDate(date: Date): string {
    return DateTime.fromJSDate(date).toFormat(DATE_DISPLAY_FORMAT);
}

export function getChartDisplayDate(date: string): string {
    return DateTime.fromISO(date).toFormat(CHART_DISPLAY_FORMAT);
}

export function getMaxDate(date1: Date, date2: Date): Date {
    return DateTime.max(DateTime.fromJSDate(date1), DateTime.fromJSDate(date2)).toJSDate();
}

export function getMinDate(date1: Date, date2: Date): Date {
    return DateTime.min(DateTime.fromJSDate(date1), DateTime.fromJSDate(date2)).toJSDate();
}

export function IsSameDay(date1: Date, date2: Date): boolean {
    return DateTime.fromJSDate(date1).hasSame(DateTime.fromJSDate(date2), "day");
}

export function DateIsOnA(date: Date | string, dayOfWeek: number): boolean {
    let jsDate = new Date(date);
    let day = DateTime.fromJSDate(jsDate).weekday;
    return day === dayOfWeek;
}

export function ContainsDate(dates: Date[], query: Date) {
    return dates.some((date: Date) => { return IsSameDay(query, date) })
}

// export function AddDuration(date: Date, value: number, increment: "minutes" | "hours" | "days" | "months" | "years") {
//     let durationObj: DurationObject = {};
//     durationObj[increment] = value;
//     return DateTime.fromJSDate(date).plus(durationObj).toJSDate();
// }

// export function getMonthsWithPercentageOfRange(dateRange: DateRange): { name: string, percentage: number }[] {
//     let startOfFirstMonth = getMonthStart(dateRange.StartDate);
//     let totalDays = getDayCount(startOfFirstMonth, getMonthEnd(dateRange.EndDate));

//     let months: { name: string, percentage: number }[] = [];
//     months.push({ name: "", percentage: percentageOfRange(0.5) });

//     let date = new Date(startOfFirstMonth);
//     while (date <= dateRange.EndDate) {
//         let daysInMonthInRange = getDayCount(date, getMonthEnd(date));
//         if (date.getMonth() == dateRange.EndDate.getMonth()) {
//             months.push({ name: getMonthName(date), percentage: percentageOfRange(daysInMonthInRange - 0.5) });
//         } else {
//             months.push({ name: getMonthName(date), percentage: percentageOfRange(daysInMonthInRange) });
//         }
//         date = AddDuration(date, 1, 'months');
//     }

//     function getMonthName(date: Date) {
//         return DateTime.fromJSDate(date).toFormat("LLLL");
//     }

//     function percentageOfRange(days: number) {
//         return (days / totalDays) * 100;
//     }

//     return months;
// }