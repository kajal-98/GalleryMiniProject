
import { useState } from "react";
import axios from "axios";
import Card from "./Card";
import { Navbar } from "./Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { useInfiniteScroll } from "react-infinite-scroll-component";

const PAGE_SIZE = 1;

export function Gallery() {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tabIndex, setTabIndex] = useState(1);
  const [isLocalStorage, setIsLocalStorage] = useState(false);
  const [totalLocalImages, setTotalLocalImages] = useState(0);

  const fetchImages = async (
    page,
    useLocalStorage = isLocalStorage
  ) => {
    try {
      setLoading(true);
      setError(null);

      if (useLocalStorage) {
        const storedItems = localStorage.getItem("items");
        const parsedItems = storedItems
          ? JSON.parse(storedItems)
          : [];

        if (!Array.isArray(parsedItems)) {
          throw new Error("Stored items must be an array.");
        }

        const filteredImages = parsedItems.filter(
          (item) => item.itemType === "image"
        );

        setTotalLocalImages(filteredImages.length);

        const startIndex = (page - 1) * PAGE_SIZE;
        const paginatedImages = filteredImages.slice(
          startIndex,
          startIndex + PAGE_SIZE
        );

        setImages(paginatedImages);
      } else {
        const response = await axios.get(
          `https://picsum.photos/v2/list?page=${page}&limit=${PAGE_SIZE}`
        );

        setImages(response.data);
      }
    } catch (err) {
      setImages([]);
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleFetch = () => {
    fetchImages(tabIndex);
  };

  const handlePrev = () => {
    if (tabIndex <= 1 || loading) return;

    const newIndex = tabIndex - 1;
    setTabIndex(newIndex);
    fetchImages(newIndex);
  };

  const handleNext = () => {
    if (loading) return;

    if (isLocalStorage) {
      const maxPage = Math.ceil(totalLocalImages / PAGE_SIZE);

      if (tabIndex >= maxPage) return;
    }

    const newIndex = tabIndex + 1;
    setTabIndex(newIndex);
    fetchImages(newIndex);
  };

  const handleToggle = () => {
    if (loading) return;

    const newSource = !isLocalStorage;

    setIsLocalStorage(newSource);
    setTabIndex(1);
    fetchImages(1, newSource);
  };

  const maxLocalPage = Math.ceil(totalLocalImages / PAGE_SIZE);

  return (
    <>

      <Navbar />

      <div>
        <h1>Welcome to the Gallery</h1>

        <span>
          Local Storage{" "}
          <button
            type="button"
            className={`toggle ${isLocalStorage ? "active" : ""}`}
            onClick={handleToggle}
            disabled={loading}
            aria-label="Toggle local storage source"
            aria-pressed={isLocalStorage}
          >
            <span className="slider">
              <FontAwesomeIcon icon={faPowerOff} />
            </span>
          </button>
        </span>

        <p>
          <button
            type="button"
            onClick={handleFetch}
            disabled={loading}
          >
            Fetch Images
          </button>
        </p>

        {loading && <p>Loading...</p>}

        {error && <p role="alert">Error: {error}</p>}

        {!loading && !error && <Card images={images} />}

        {!loading && !error && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <button
              type="button"
              onClick={handlePrev}
              disabled={tabIndex <= 1}
            >
              Prev
            </button>

            <p>Page: {tabIndex}</p>

            <button
              type="button"
              onClick={handleNext}
              disabled={
                isLocalStorage &&
                (totalLocalImages === 0 ||
                  tabIndex >= maxLocalPage)
              }
            >
              Next
            </button>
          </div>
        )}
      </div>
    </>
  );
}
