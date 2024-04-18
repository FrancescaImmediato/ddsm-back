import {
  updateUserProfile,
  archiveProfile as _archiveProfile,
} from '../db/users.js';
import pkg from 'lodash';
const { get, merge } = pkg;

export const updateProfile = async (req, res) => {
  const {
    username,
    country,
    first_name,
    last_name,
    profile_picture,
    biography,
  } = req.body;

  const user = get(req, 'identity');

  if (!user) return res.sendStatus(500);

  try {
    const update = {
      username,
      country,
      first_name,
      last_name,
      profile_picture,
      biography,
    };

    await updateUserProfile(user._id, update);

    return res.sendStatus(200);
  } catch (error) {
    console.error('Error updating profile: ', error);
    return res.sendStatus(400).json({
      error: 'Invalid request...',
    });
  }
};

export const archiveProfile = async (req, res) => {
  try {
    const user = get(req, 'identity');
    await _archiveProfile(user._id);
    res.sendStatus(200);
  } catch (error) {
    console.error('Error archiving profile: ', error);
    return res.sendStatus(500);
  }
};
