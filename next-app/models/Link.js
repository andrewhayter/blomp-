```javascript
import mongoose from 'mongoose';

const LinkSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title for this link.'],
    maxlength: [60, 'Title cannot be more than 60 characters'],
  },
  url: {
    type: String,
    required: [true, 'Please provide a URL for this link.'],
    match: [
      /^((http|https):\/\/)?[a-zA-Z0-9\.\/\?\:@\-_=#]+\.([a-zA-Z]){2,6}([a-zA-Z0-9\.\&\/\?\:@\-_=#])*$/,
      'Please use a valid URL format',
    ],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
});

export default mongoose.models.Link || mongoose.model('Link', LinkSchema);
```