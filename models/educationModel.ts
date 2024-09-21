import mongoose, {Document, Schema, model, Types} from "mongoose"

interface Ieducation extends Document{
    passingYearFrom: string,
    passingYearTo: string,
    educationType: string,
    institute: string,
    instituteLocation: string,
    course: string,
    point:string,
    outOf: string,
    createdBy: Types.ObjectId
}

const educationSchema = new Schema<Ieducation>({
    passingYearFrom: {
        type: String,
        trim: true
    },
    passingYearTo: {
        type: String,
        required: true,
        trim: true
    },
    educationType: {
        type: String,
        required: true,
        trim: true
    },
    institute: {
        type: String,
        required: true,
        trim: true
    },
    instituteLocation: {
        type: String,
        required: true,
        trim: true
    },
    course: {
        type: String,
        required: true,
        trim: true
    },
    point: {
        type: String,
        required: true,
        trim: true
    },
    outOf: {
        type: String,
        required: true,
        trim: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
})

export const educationModel = mongoose.models.Education as mongoose.Model<Ieducation> || model<Ieducation>("Education", educationSchema)