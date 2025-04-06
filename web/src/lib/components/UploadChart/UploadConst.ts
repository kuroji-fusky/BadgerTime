export const WEEKS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

type _TrimStrLiteral<S> = S extends `${infer l1}${infer l2}${infer l3}${string}` ? `${l1}${l2}${l3}` : never
type _WeekRecordBase<T> = Record<Lowercase<_TrimStrLiteral<typeof WEEKS[number]>>, T>

// temporary
interface VideoDataMinimal {
  id: string
  thumbnail: string
  title: string
}

// temporary
interface VideoDataFull extends VideoDataMinimal {
  publishDate: string
}

type HourBlockRange = 0 | 1 | 2 | 3 | 4

export type WeekHourRangeData<R extends HourBlockRange> = _WeekRecordBase<R[]>
export type WeekVideoData<R extends HourBlockRange, V extends VideoDataFull> = _WeekRecordBase<{
  range: R[],
  data: Readonly<V>
}[]>


export const weekDayRows = [
  { id: "sun", text: "Sun", a11yLabel: "Sunday" },
  { id: "mon", text: "Mon", a11yLabel: "Monday" },
  { id: "tue", text: "Tue", a11yLabel: "Tuesday" },
  { id: "wed", text: "Wed", a11yLabel: "Wednesday" },
  { id: "thu", text: "Thu", a11yLabel: "Thursday" },
  { id: "fri", text: "Fri", a11yLabel: "Friday" },
  { id: "sat", text: "Sat", a11yLabel: "Saturday" },
]
