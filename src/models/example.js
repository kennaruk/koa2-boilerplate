import mongoose from "mongoose";

const { Schema } = mongoose;

const exampleSchema = new Schema(
	{
		name: String,
		description: String,
		type: String,
		species: [String],
		samples: [{ type: Schema.Types.ObjectId, ref: "sample" }],
		createdBy: { type: Schema.Types.ObjectId, ref: "user" }
	},
	{ timestamps: true }
);

export const model = mongoose.model("example", exampleSchema);
