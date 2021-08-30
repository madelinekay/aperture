const signup = (email: string, username: string) => {
  let user = {
    [email]: username,
  };

  return fetch(
    "https://complete-walkthrough-default-rtdb.firebaseio.com/meetups.json",
    {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export default signup;
