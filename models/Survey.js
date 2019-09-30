const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient')

const surveyModel = new Schema ({
    title: String,
    body: String,
    subject: String,
    // RecipientSchema is a subdocument collection
    recipients: [RecipientSchema],
    yes: { type: Number, default: 0 },
    no: { type: Number, default: 0 },
    _user: { type: Schema.Types.ObjectId, ref: 'User'},
    dateSent: Date,
    lastResponded: Date
})

mongoose.model('surveys', surveyModel);