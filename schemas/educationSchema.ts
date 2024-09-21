import { z } from "zod";

const educationSchema = z.object({
    passingYearFrom: z.string().optional(),
    passingYearTo: z.string().length(4, "Year must be include with 4 numbers"),
    educationType: z.string().min(1, "Education type/subject Required"),
    institute: z.string().min(1, "Institute required"),
    instituteLocation: z.string().min(1, "Institute Location required"),
    course: z.string().min(1, "Course/Group Name required"),
    point: z.string().min(1, "Point required"),
    outOf: z.string().min(1, "Out of Point required")
})

export default educationSchema