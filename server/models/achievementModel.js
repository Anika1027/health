const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  badgeId: {
    type: String,
    required: true
  },
  earnedAt: {
    type: Date,
    default: Date.now
  },
  progress: {
    type: Number,
    default: 100,
    min: 0,
    max: 100,
    validate: {
      validator: function(value) {
        return value >= 0 && value <= 100;  // Ensures progress is a percentage
      },
      message: 'Progress must be between 0 and 100'
    }
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed  // Allows flexible data types for metadata
  }
});

// Index for faster queries by userId and badgeId
achievementSchema.index({ userId: 1, badgeId: 1 });

// Optional: Add additional indexes if you often query by earnedAt
// achievementSchema.index({ earnedAt: 1 });

const Achievement = mongoose.model('Achievement', achievementSchema);

module.exports = Achievement;
