const BASE_API = `https://creative-juices.fly.dev/api`;
// const BASE_API = `/api`;

export const getAllBundles = async () => {
  try {
    const response = await fetch(`${BASE_API}/bundles`);
    const results = await response.json();
    return results;
  } catch (error) {
    console.error(error);
  }
};

export const getBundlesById = async (token, bundleId) => {
  try {
    const response = await fetch(`${BASE_API}/bundles/${bundleId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const results = await response.json();
    console.log('thisi s results in bundlesby ID', results);
    return results;
  } catch (error) {
    console.error(error);
  }
};

export const createABundle = async (
  token,
  bundlename,
  quantity,
  bundlecost
) => {
  try {
    const response = await fetch(`${BASE_API}/bundles`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        bundlename,
        quantity,
        bundlecost,
      }),
    });

    const results = await response.json();
    // console.log('look at our results:', results);
    return results;
  } catch (error) {
    // console.error('what a horrible happening:', error);
    throw error;
  }
};
