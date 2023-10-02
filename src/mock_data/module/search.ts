const code = `
  const run = async ({query}) => {
    const encodedQuery = encodeURIComponent(query);

    const data = await sendRequest({
      url: \`https://vuighe2.com/api/v2/search?q=\${encodedQuery\}&limit=24\`,
      method: "GET",
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        "Referer": "https://vuighe2.com/assassins-pride",
      },
    })

    const composedData = data.data.map((result) => ({
      id: result.id,
      title: result.name,
      thumbnail: result.thumbnail,
      extra: {
        slug: result.slug,
      },
    }));

    sendResponse(composedData);
  }
`;

export default code;
