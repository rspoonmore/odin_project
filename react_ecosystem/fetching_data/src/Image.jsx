import { useEffect, useState } from "react";

const useImageURL = () => {
    const [imageURL, setImageURL] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon/charizard", { mode: "cors" })
      .then((response) => {
        if (response.status >= 400) {
            throw new Error("server error");
        }
        return response.json()
      })
      .then((response) => setImageURL(response['sprites']['front_default']))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  return { imageURL, error, loading }
}

const Image = () => {
  const { imageURL, error, loading } = useImageURL();

  if (loading) return <p>Loading...</p>
  if (error) return <p>A netwrok error was encountered</p>

  return (
    imageURL && (
      <>
        <h1>An image</h1>
        <img src={imageURL} alt={"placeholder text"} />
      </>
    )
  );
};

export default Image;
