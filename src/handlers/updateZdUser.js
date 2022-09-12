require('dotenv').config();
const axios = require('axios');

exports.updateZdUser = async (event, context, callback) => {
  const email = event.email;
  const externalId = event?.externalId;
  const searchQuery = `${process.env.ZD_DOMAIN}/api/v2/users/search?query=email:${email}`;

  const getUser = async () => {
    try {
      const res = await axios.get(searchQuery, {
        auth: {
          username: process.env.ZD_KEY,
          password: proces.env.ZD_TOKEN,
        },
      });
      return res;
    } catch (error) {
      console.error(error);
    }
  };

  const updateUser = async (user_id, external_id) => {
    const updateUrl = `${sandboxDomain}/api/v2/users/${user_id}`;
    try {
      const res = await axios.put(updateUrl, {
        auth: {
          username: process.env.ZD_KEY,
          password: proces.env.ZD_TOKEN,
        },
        data: {
          user: {
            external_id,
          },
        },
      });
      return res;
    } catch (error) {
      console.error(error);
    }
  };

  const zdUser = await getUser();

  if (!zdUser.external_id) {
    const response = await updateUser(zdUser.id);
    return response;
  }
  return 'user/id exists';
};
